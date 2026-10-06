# Codigix API (backend)

Node.js + Express 5 REST API that powers the Codigix website and its admin panel (`/admin`).

**Database:** SQLite by default (`DB_CLIENT=sqlite`) — zero setup, stored in `backend/data/codigix.db`. Set `DB_CLIENT=mysql` and the `DB_*` values to use MySQL instead. The same routes and SQL run on both.

## Setup

```bash
cd backend
npm install
cp .env.example .env        # then set JWT_SECRET / REVALIDATE_SECRET (and DB_* if using MySQL)
npm run dev                 # http://localhost:5000 — first start creates tables, admin user and starting content
```

The first admin comes from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env` (default `admin@codigix.com` / `Admin@12345`).
**Change the password after your first login** (Admin → My profile).

Reset or create an admin at any time:

```bash
npm run create-admin -- "Full Name" you@codigix.com "NewStrongPass123"
```

Tables are created automatically on every start (`CREATE TABLE IF NOT EXISTS`), and `npm run seed` only fills tables that are empty, so it never overwrites content edited in the admin.

## Environment

| Variable | Purpose |
| --- | --- |
| `PORT` | API port (default 5000) |
| `CORS_ORIGINS` | Comma-separated website origins allowed to call the API |
| `DB_CLIENT` | `sqlite` (default) or `mysql` |
| `SQLITE_FILE` | SQLite file path (default `data/codigix.db`) |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | MySQL connection (only with `DB_CLIENT=mysql`). The database is created if missing. |
| `JWT_SECRET` | Long random string used to sign admin sessions (required in production) |
| `SITE_URL`, `REVALIDATE_SECRET` | Lets the API refresh the Next.js cache right after an edit. The secret must match `REVALIDATE_SECRET` in the site's `.env.local`. |
| `MAX_IMAGE_MB`, `MAX_RESUME_MB` | Upload limits |

## API overview

Public (no auth):

| Method | Path | |
| --- | --- | --- |
| GET | `/api/public/settings` | site, SEO, contact and social settings |
| GET | `/api/public/dashboard` | hero dashboard numbers |
| GET | `/api/public/clients` · `/videos` · `/testimonials` · `/faqs?page=home` | site content |
| GET | `/api/public/blogs?page&limit&category&tag&search&featured` | published posts |
| GET | `/api/public/blogs/:slug` | post + table of contents + related + prev/next |
| GET | `/api/public/blogs/categories` · `/blogs/tags` · `/blogs/sitemap` | |
| POST | `/api/public/blogs/:slug/view` | counts a view |
| GET | `/api/public/jobs` · `/jobs/:slug` | open positions |
| POST | `/api/public/contact` · `/newsletter` | forms (rate-limited, honeypot) |
| POST | `/api/public/jobs/apply` | multipart with `resume` (PDF/DOC/DOCX) |

Auth: `POST /api/auth/login`, `GET /api/auth/me`, `PUT /api/auth/profile`, `PUT /api/auth/password`.

Admin (Bearer token): `/api/admin/overview`, `blogs` (+ `/:id/duplicate`, `/bulk`, `/slug-available`),
`blog-categories`, `clients`, `videos`, `testimonials`, `faqs`, `jobs`, `applications` (+ `/:id/resume`),
`messages`, `subscribers` (+ `/export.csv`), `settings/:key`, `media`, `users` (admin role only), `revalidate`.
Resource routes support `?search=&page=&limit=`, `POST /reorder` and `POST /bulk-delete`.

## Security notes

- Passwords hashed with bcrypt; login is rate-limited; tokens are re-validated against the DB on every request.
- Blog/job HTML is sanitised on save (no scripts, event handlers or `javascript:` links).
- Images are re-encoded to WebP with sharp (strips metadata, blocks disguised files). SVG uploads are not allowed.
- Resumes are stored in `private_uploads/` and only downloadable by signed-in staff.
- CSV exports are protected against spreadsheet formula injection.

## Production

- Set `NODE_ENV=production`, a strong `JWT_SECRET`, and real `CORS_ORIGINS` / `SITE_URL` / `API_PUBLIC_URL`.
- Run with a process manager, e.g. `pm2 start src/server.js --name codigix-api`.
- Put it behind Nginx with HTTPS and set `client_max_body_size 10m;`.
- Back up the database (`data/` for SQLite, or your MySQL dump) and the `uploads/` + `private_uploads/` folders.
