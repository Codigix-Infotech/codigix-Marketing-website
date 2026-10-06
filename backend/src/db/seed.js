import fs from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import bcrypt from 'bcryptjs';
import env from '../config/env.js';
import { closeDb, one, query } from '../config/db.js';
import { getSetting, setSetting } from '../services/settings.js';
import { readingTime, slugify, wordCount } from '../utils/text.js';
import { runMigrations } from './migrate.js';
import * as data from './seedData.js';

// Seeding is idempotent: each block only runs when its table/setting is empty,
// so re-running never overwrites content edited in the admin panel.

const isEmpty = async (table) => (await one(`SELECT COUNT(*) AS n FROM \`${table}\``)).n === 0;

async function seedAdmin() {
  if (!(await isEmpty('users'))) return console.log('  users: skipped (already has users)');
  const hash = await bcrypt.hash(env.admin.password, 12);
  await query('INSERT INTO users SET ?', [{ name: env.admin.name, email: env.admin.email.toLowerCase(), password_hash: hash, role: 'admin' }]);
  console.log(`  users: created admin ${env.admin.email}`);
}

async function seedSettings() {
  for (const [key, value] of Object.entries(data.settings)) {
    if (await getSetting(key)) continue;
    await setSetting(key, value);
    console.log(`  settings.${key}: created`);
  }
}

async function copyClientLogo(file) {
  const projectRoot = path.resolve(env.root, '..');
  const src = path.join(projectRoot, file);
  const ext = path.extname(file).toLowerCase() === '.jpeg' ? '.jpg' : path.extname(file).toLowerCase();
  const name = `${slugify(path.parse(file).name.replace(/\.jpg$/i, ''))}${ext}`;
  const destDir = path.join(env.uploadDir, 'clients');
  try {
    await fs.mkdir(destDir, { recursive: true });
    await fs.copyFile(src, path.join(destDir, name));
    return `/uploads/clients/${name}`;
  } catch {
    return null; // logo file not present: the site shows the client name instead
  }
}

async function seedClients() {
  if (!(await isEmpty('clients'))) return console.log('  clients: skipped');
  for (const [i, c] of data.clients.entries()) {
    const { file, ...rest } = c;
    const logo = await copyClientLogo(file);
    await query('INSERT INTO clients SET ?', [{ ...rest, logo, sort_order: i, industry: c.is_healthcare ? 'Healthcare' : null }]);
  }
  console.log(`  clients: ${data.clients.length} created`);
}

async function seedSimple(table, rows, map = (r) => r) {
  if (!(await isEmpty(table))) return console.log(`  ${table}: skipped`);
  for (const [i, r] of rows.entries()) await query(`INSERT INTO \`${table}\` SET ?`, [{ ...map(r), sort_order: i }]);
  console.log(`  ${table}: ${rows.length} created`);
}

async function seedBlogs() {
  if (!(await isEmpty('blog_categories'))) {
    console.log('  blog_categories: skipped');
  } else {
    for (const [i, c] of data.categories.entries()) {
      await query('INSERT INTO blog_categories SET ?', [{ ...c, slug: slugify(c.name), sort_order: i }]);
    }
    console.log(`  blog_categories: ${data.categories.length} created`);
  }

  if (!(await isEmpty('blogs'))) return console.log('  blogs: skipped');
  const admin = await one("SELECT id FROM users WHERE role = 'admin' ORDER BY id LIMIT 1");
  for (const b of data.blogs) {
    const { category, tags, faqs, ...rest } = b;
    const cat = await one('SELECT id FROM blog_categories WHERE name = ?', [category]);
    await query('INSERT INTO blogs SET ?', [
      {
        ...rest,
        category_id: cat?.id ?? null,
        tags: JSON.stringify(tags),
        faqs: JSON.stringify(faqs),
        status: 'published',
        author_name: 'Codigix Team',
        author_role: 'Healthcare Growth Strategists',
        author_bio: 'The Codigix Infotech team helps clinics, hospitals and growing brands win on Google, Maps and social media.',
        word_count: wordCount(rest.content),
        reading_time: readingTime(rest.content),
        created_by: admin?.id ?? null,
        updated_by: admin?.id ?? null,
      },
    ]);
  }
  console.log(`  blogs: ${data.blogs.length} created`);
}

async function seedJobs() {
  if (!(await isEmpty('jobs'))) return console.log('  jobs: skipped');
  for (const [i, j] of data.jobs.entries()) {
    await query('INSERT INTO jobs SET ?', [
      {
        ...j,
        slug: slugify(j.title),
        responsibilities: JSON.stringify(j.responsibilities),
        requirements: JSON.stringify(j.requirements),
        benefits: JSON.stringify(j.benefits),
        status: 'open',
        sort_order: i,
      },
    ]);
  }
  console.log(`  jobs: ${data.jobs.length} created`);
}

/** Fill any empty tables with the starting content (safe to call on every boot). */
export async function seedIfEmpty() {
  if (!(await isEmpty('users'))) return;
  console.log('[seed] fresh database — adding admin user and starting content');
  await seedAll();
}

async function seedAll() {
  await seedAdmin();
  await seedSettings();
  await seedClients();
  await seedSimple('videos', data.videos, (v) => ({ ...v, thumbnail: `https://img.youtube.com/vi/${v.youtube_id}/hqdefault.jpg` }));
  await seedSimple('testimonials', data.testimonials);
  await seedSimple('faqs', data.faqs, (f) => ({ ...f, page: 'home' }));
  await seedBlogs();
  await seedJobs();
  console.log('[seed] done');
}

async function main() {
  await runMigrations();
  console.log('[seed] seeding initial content…');
  await seedAll();
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => closeDb());
