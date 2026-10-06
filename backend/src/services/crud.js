import { Router } from 'express';
import { one, query } from '../config/db.js';
import { buildRecord, pageMeta, pagination, parseJsonColumns, toBooleans } from '../utils/fields.js';
import { badRequest, notFound } from '../utils/httpError.js';
import { slugify } from '../utils/text.js';
import { revalidate } from './revalidate.js';

const IDENT = /^[a-z_][a-z0-9_]*$/;

export function normalizeRow(row, { jsonColumns = [], boolColumns = [] } = {}) {
  parseJsonColumns(row, jsonColumns);
  toBooleans(row, boolColumns);
  return row;
}

/** Return `base`, or `base-2`, `base-3`… so the slug is unique within `table`. */
export async function uniqueSlug(table, base, excludeId = null) {
  const root = slugify(base) || 'item';
  let candidate = root;
  for (let i = 2; i < 500; i += 1) {
    const params = [candidate];
    let sql = `SELECT id FROM \`${table}\` WHERE slug = ?`;
    if (excludeId) {
      sql += ' AND id <> ?';
      params.push(excludeId);
    }
    if (!(await one(sql, params))) return candidate;
    candidate = `${root}-${i}`;
  }
  return `${root}-${Date.now()}`;
}

function toCsv(rows, columns) {
  const esc = (v) => {
    if (v == null) return '';
    const s = v instanceof Date ? v.toISOString() : typeof v === 'object' ? JSON.stringify(v) : String(v);
    // Neutralise spreadsheet formula injection.
    const safe = /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
    return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
  };
  return [columns.join(','), ...rows.map((r) => columns.map((c) => esc(r[c])).join(','))].join('\r\n');
}

/**
 * Build a standard admin CRUD router for a table.
 *
 * @param {object} cfg
 * @param {string} cfg.table
 * @param {Record<string, object>} cfg.fields     writable fields (see utils/fields.js)
 * @param {string[]} [cfg.searchable]             columns matched by ?search=
 * @param {string[]} [cfg.filterable]             columns filterable by exact ?col=value
 * @param {string[]} [cfg.jsonColumns]
 * @param {string[]} [cfg.boolColumns]
 * @param {string}   [cfg.defaultOrder]
 * @param {string[]} [cfg.sortable]               columns allowed in ?sort=col:asc
 * @param {string[]} [cfg.tags]                   Next.js cache tags to revalidate on change
 * @param {boolean}  [cfg.slugFrom]               field to derive `slug` from when empty
 * @param {{create?: boolean, update?: boolean, remove?: boolean}} [cfg.allow]
 * @param {string[]} [cfg.exportColumns]          enables GET /export.csv
 * @param {(record: object, ctx: {req: any, id: number|null}) => Promise<void>|void} [cfg.beforeSave]
 */
export function createCrudRouter(cfg) {
  const {
    table,
    fields,
    searchable = [],
    filterable = [],
    jsonColumns = [],
    boolColumns = [],
    defaultOrder = 'id DESC',
    sortable = [],
    tags = [],
    slugFrom = null,
    allow = {},
    exportColumns = null,
    beforeSave,
  } = cfg;
  const can = { create: true, update: true, remove: true, ...allow };
  const router = Router();
  const norm = (row) => normalizeRow(row, { jsonColumns, boolColumns });

  function buildWhere(q) {
    const where = [];
    const params = [];
    if (q.search && searchable.length) {
      where.push(`(${searchable.map((c) => `\`${c}\` LIKE ?`).join(' OR ')})`);
      for (let i = 0; i < searchable.length; i += 1) params.push(`%${q.search}%`);
    }
    for (const col of filterable) {
      if (q[col] !== undefined && q[col] !== '') {
        where.push(`\`${col}\` = ?`);
        params.push(q[col]);
      }
    }
    return { sql: where.length ? `WHERE ${where.join(' AND ')}` : '', params };
  }

  function orderBy(q) {
    if (q.sort) {
      const [col, dir] = String(q.sort).split(':');
      if (IDENT.test(col) && (sortable.includes(col) || col === 'id' || col === 'created_at')) {
        return `\`${col}\` ${dir === 'asc' ? 'ASC' : 'DESC'}`;
      }
    }
    return defaultOrder;
  }

  router.get('/', async (req, res) => {
    const p = pagination(req.query, { defaultLimit: 25, maxLimit: 500 });
    const w = buildWhere(req.query);
    const [{ total }] = await query(`SELECT COUNT(*) AS total FROM \`${table}\` ${w.sql}`, w.params);
    const rows = await query(
      `SELECT * FROM \`${table}\` ${w.sql} ORDER BY ${orderBy(req.query)} LIMIT ? OFFSET ?`,
      [...w.params, p.limit, p.offset]
    );
    res.json({ data: rows.map(norm), meta: pageMeta(total, p) });
  });

  if (exportColumns) {
    router.get('/export.csv', async (req, res) => {
      const w = buildWhere(req.query);
      const rows = await query(`SELECT * FROM \`${table}\` ${w.sql} ORDER BY ${orderBy(req.query)}`, w.params);
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${table}-${new Date().toISOString().slice(0, 10)}.csv"`);
      res.send('﻿' + toCsv(rows, exportColumns));
    });
  }

  router.get('/:id', async (req, res) => {
    const row = await one(`SELECT * FROM \`${table}\` WHERE id = ?`, [req.params.id]);
    if (!row) throw notFound();
    res.json({ data: norm(row) });
  });

  if (can.create) {
    router.post('/', async (req, res) => {
      const record = buildRecord(fields, req.body);
      if (slugFrom) record.slug = await uniqueSlug(table, record.slug || record[slugFrom]);
      if (beforeSave) await beforeSave(record, { req, id: null });
      const result = await query(`INSERT INTO \`${table}\` SET ?`, [record]);
      const row = await one(`SELECT * FROM \`${table}\` WHERE id = ?`, [result.insertId]);
      revalidate(tags);
      res.status(201).json({ data: norm(row) });
    });
  }

  if (can.update) {
    router.put('/:id', async (req, res) => {
      const id = Number(req.params.id);
      const existing = await one(`SELECT * FROM \`${table}\` WHERE id = ?`, [id]);
      if (!existing) throw notFound();
      const record = buildRecord(fields, req.body, { partial: true });
      if (slugFrom && ('slug' in record || !existing.slug)) {
        record.slug = await uniqueSlug(table, record.slug || record[slugFrom] || existing[slugFrom], id);
      }
      if (beforeSave) await beforeSave(record, { req, id });
      if (Object.keys(record).length) {
        await query(`UPDATE \`${table}\` SET ? WHERE id = ?`, [record, id]);
      }
      const row = await one(`SELECT * FROM \`${table}\` WHERE id = ?`, [id]);
      revalidate(tags);
      res.json({ data: norm(row) });
    });

    // Persist drag-and-drop ordering: body { ids: [3, 1, 2] }
    if (fields.sort_order) {
      router.post('/reorder', async (req, res) => {
        const ids = Array.isArray(req.body?.ids) ? req.body.ids.map(Number).filter(Boolean) : [];
        if (!ids.length) throw badRequest('ids array is required');
        await Promise.all(ids.map((id, idx) => query(`UPDATE \`${table}\` SET sort_order = ? WHERE id = ?`, [idx, id])));
        revalidate(tags);
        res.json({ ok: true });
      });
    }
  }

  if (can.remove) {
    router.delete('/:id', async (req, res) => {
      const result = await query(`DELETE FROM \`${table}\` WHERE id = ?`, [req.params.id]);
      if (!result.affectedRows) throw notFound();
      revalidate(tags);
      res.json({ ok: true });
    });

    router.post('/bulk-delete', async (req, res) => {
      const ids = Array.isArray(req.body?.ids) ? req.body.ids.map(Number).filter(Boolean) : [];
      if (!ids.length) throw badRequest('ids array is required');
      const result = await query(`DELETE FROM \`${table}\` WHERE id IN (?)`, [ids]);
      revalidate(tags);
      res.json({ ok: true, deleted: result.affectedRows });
    });
  }

  return router;
}
