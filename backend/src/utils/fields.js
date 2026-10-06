import { badRequest } from './httpError.js';
import { sanitizeRichText } from './sanitize.js';

/**
 * Tiny schema layer used by every write endpoint.
 * A field definition: { type, required, max, values, default, label }
 *   type: string | text | html | int | float | bool | json | date | datetime | enum | email | url
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function safeParse(name, raw) {
  try {
    return JSON.parse(raw);
  } catch {
    throw badRequest(`${name} must be valid JSON`);
  }
}

function coerce(name, def, raw) {
  if (raw === undefined) return undefined;
  if (raw === null || raw === '') {
    return def.type === 'bool' ? 0 : null;
  }
  switch (def.type) {
    case 'int': {
      const n = Number.parseInt(raw, 10);
      if (Number.isNaN(n)) throw badRequest(`${name} must be a whole number`);
      return n;
    }
    case 'float': {
      const n = Number(raw);
      if (Number.isNaN(n)) throw badRequest(`${name} must be a number`);
      return n;
    }
    case 'bool':
      return raw === true || raw === 1 || raw === '1' || raw === 'true' || raw === 'on' ? 1 : 0;
    case 'json': {
      const value = typeof raw === 'string' ? safeParse(name, raw) : raw;
      return JSON.stringify(value);
    }
    case 'enum': {
      const v = String(raw);
      if (!def.values.includes(v)) throw badRequest(`${name} must be one of: ${def.values.join(', ')}`);
      return v;
    }
    case 'email': {
      const v = String(raw).trim().toLowerCase();
      if (!EMAIL_RE.test(v)) throw badRequest(`${def.label || name} must be a valid email address`);
      return v.slice(0, def.max || 190);
    }
    case 'url': {
      const v = String(raw).trim();
      if (!/^(https?:\/\/|\/)/i.test(v)) throw badRequest(`${def.label || name} must be a URL starting with http(s):// or /`);
      return v.slice(0, def.max || 500);
    }
    case 'date':
    case 'datetime': {
      const d = new Date(raw);
      if (Number.isNaN(d.getTime())) throw badRequest(`${name} must be a valid date`);
      return def.type === 'date' ? d.toISOString().slice(0, 10) : d;
    }
    case 'html':
      return sanitizeRichText(raw);
    case 'text': {
      const v = String(raw);
      return def.max ? v.slice(0, def.max) : v;
    }
    case 'string':
    default: {
      const v = String(raw).trim();
      return def.max ? v.slice(0, def.max) : v;
    }
  }
}

/**
 * Build a DB record from a request body.
 * @param {Record<string, object>} defs
 * @param {object} body
 * @param {{ partial?: boolean }} opts partial=true for updates (missing fields are left alone)
 */
export function buildRecord(defs, body = {}, { partial = false } = {}) {
  const out = {};
  for (const [name, def] of Object.entries(defs)) {
    let value = coerce(name, def, body[name]);
    if (value === undefined && !partial && def.default !== undefined) {
      value = typeof def.default === 'function' ? def.default() : def.default;
      if (def.type === 'json' && value !== null && typeof value !== 'string') value = JSON.stringify(value);
    }
    const missing = value === null || (value === undefined && !partial);
    if (def.required && missing) {
      throw badRequest(`${def.label || name} is required`);
    }
    if (value !== undefined) out[name] = value;
  }
  return out;
}

/** mysql2 already parses JSON columns, but be defensive for strings. */
export function parseJsonColumns(row, columns) {
  if (!row) return row;
  for (const c of columns) {
    if (typeof row[c] === 'string') {
      try {
        row[c] = JSON.parse(row[c]);
      } catch {
        /* leave as-is */
      }
    }
  }
  return row;
}

/** Convert TINYINT(1) columns to real booleans for API consumers. */
export function toBooleans(row, columns) {
  if (!row) return row;
  for (const c of columns) if (c in row) row[c] = Boolean(row[c]);
  return row;
}

export function pagination(query, { defaultLimit = 20, maxLimit = 100 } = {}) {
  const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
  const limit = Math.min(maxLimit, Math.max(1, Number.parseInt(query.limit, 10) || defaultLimit));
  return { page, limit, offset: (page - 1) * limit };
}

export function pageMeta(total, { page, limit }) {
  return { total, page, limit, pages: Math.max(1, Math.ceil(total / limit)) };
}
