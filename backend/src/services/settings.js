import { one, query } from '../config/db.js';

/**
 * Site-wide settings live in a key/value table with JSON values.
 * PUBLIC_KEYS are readable without auth; everything is editable by admins.
 */
export const SETTING_KEYS = ['site', 'contact', 'social', 'hero_dashboard', 'seo'];
export const PUBLIC_KEYS = ['site', 'contact', 'social', 'hero_dashboard', 'seo'];

export async function getSetting(key) {
  const row = await one('SELECT value FROM settings WHERE `key` = ?', [key]);
  if (!row) return null;
  return typeof row.value === 'string' ? JSON.parse(row.value) : row.value;
}

export async function getSettings(keys) {
  if (!keys.length) return {};
  const rows = await query('SELECT `key`, value FROM settings WHERE `key` IN (?)', [keys]);
  const out = Object.fromEntries(keys.map((k) => [k, null]));
  for (const r of rows) out[r.key] = typeof r.value === 'string' ? JSON.parse(r.value) : r.value;
  return out;
}

export async function setSetting(key, value) {
  await query(
    'INSERT INTO settings (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)',
    [key, JSON.stringify(value ?? {})]
  );
  return value;
}
