# Codigix website + CMS

- **Website:** Next.js 14 (this folder), runs on http://localhost:3002
- **API / CMS backend:** Node.js + Express + SQLite (or MySQL) in [`backend/`](backend/README.md), runs on http://localhost:5000
- **Admin panel:** http://localhost:3002/admin

## Quick start

```bash
# 1. Backend
npm run api:install
cp backend/.env.example backend/.env     # SQLite works out of the box; set DB_CLIENT=mysql to use MySQL
npm run api                              # starts the API on :5000 (first run creates DB, admin user and content)

# 2. Website (in another terminal)
npm install
cp .env.local.example .env.local         # REVALIDATE_SECRET must match backend/.env
npm run dev                              # http://localhost:3002
```

Sign in at `/admin` with `admin@codigix.com` / `Admin@12345` (from `backend/.env`), then change the password.

## What is managed from the admin panel

| Admin section | Where it appears on the site |
| --- | --- |
| Blog Posts, Categories | `/blog`, `/blog/<slug>`, `/blog/category/<slug>`, home "Insights" section |
| Hero Dashboard | Analytics dashboard in the home page hero |
| Clients | "Trusted Partners" network map on the home page |
| Videos | "Healthcare Stories in Motion" carousel |
| Job Openings, Applications | `/careers`, `/careers/<slug>` + application form |
| Contact Messages | Contact form on `/contact` |
| Subscribers | Footer newsletter form |
| Site Settings | Footer, contact page, social icons, default SEO, Organization schema |
| Testimonials, FAQs | Stored and served by the API, ready for any page |

Edits appear on the website within seconds: the API calls `/api/revalidate` to clear the cached pages.
If the API is down, the website falls back to built-in default content instead of breaking.

## Blog SEO features

Per-post meta title and description with live Google & social previews, focus and secondary keywords, a live 0–100 SEO score with a checklist,
canonical URL, index/follow switches, schema type, Open Graph images, FAQ section (FAQPage schema), BlogPosting and Breadcrumb JSON-LD,
auto-generated table of contents, reading time, related posts, category landing pages, scheduled publishing, and an automatic `sitemap.xml`.
