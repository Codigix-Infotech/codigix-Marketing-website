# Going live

How to put the Codigix website (Next.js) and its API (`backend/`, Express) on a live server
with correct SEO settings.

## 1. Environment

| File | Copy from | Notes |
|---|---|---|
| `.env.production` | `.env.production.example` | `NEXT_PUBLIC_*` values are baked in at build time — set them **before** building. |
| `backend/.env` | `backend/.env.production.example` | `NODE_ENV=production` and a real `JWT_SECRET` are required. |

`NEXT_PUBLIC_BASE_URL` drives every canonical URL, `sitemap.xml`, `robots.txt`, Open Graph tag and
JSON-LD block. It must be the exact live address, e.g. `https://codigix.com`.

Indexing is on by default. On a **staging/test server** set `NEXT_PUBLIC_NOINDEX=true` so it never
competes with the live site in Google (robots.txt disallows everything and pages get `noindex`).
Never set it on the live server.

## 2. Build and start

```bash
npm ci && npm run build          # website
npm --prefix backend ci          # API

npm start -- -p 3000             # website on :3000
npm --prefix backend start       # API on :5000
```

Keep both running with a process manager. With PM2:

```bash
pm2 start "npm start -- -p 3000" --name codigix-web
pm2 start "npm --prefix backend start" --name codigix-api
pm2 save && pm2 startup
```

## 3. Web server (Nginx example)

HTTPS is required (free certificates: `sudo certbot --nginx -d codigix.com -d www.codigix.com -d api.codigix.com`).
The website itself redirects `www` to the main domain and sends security headers.

```nginx
server {
    listen 443 ssl http2;
    server_name codigix.com www.codigix.com;
    # ssl_certificate ... (added by certbot)

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

server {
    listen 443 ssl http2;
    server_name api.codigix.com;
    client_max_body_size 10m;   # image / resume uploads

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

server {
    listen 80;
    server_name codigix.com www.codigix.com api.codigix.com;
    return 301 https://$host$request_uri;
}
```

## 4. After the site is live — SEO checklist

1. **Check the basics** (replace the domain):
   - `https://codigix.com/robots.txt` shows `Allow: /` and the sitemap line.
   - `https://codigix.com/sitemap.xml` lists live URLs (no `localhost`).
   - `http://www.codigix.com` ends up at `https://codigix.com` in one redirect.
   - View source on the home page: `<link rel="canonical" href="https://codigix.com">`, no `noindex`.
2. **Google Search Console** → add the domain → copy the HTML-tag verification code into
   *Admin → Settings → SEO → Google site verification* → verify → *Sitemaps* → submit `sitemap.xml`.
3. **Bing Webmaster Tools** → *Import from Google Search Console* (one click, reuses the verification).
4. **Admin → Settings**, fill in what is still empty:
   - *SEO → Default OG image*: a 1200×630 image, used when links are shared on WhatsApp/LinkedIn/Facebook.
   - *SEO → Default description*: keep it to ~155 characters (Google truncates longer ones).
   - *Social*: Facebook, Instagram, LinkedIn, YouTube, X links — they become the `sameAs` links that
     tie the business to its profiles in Google.
   - *SEO → Twitter handle*.
5. **Google Business Profile**: use exactly the same name, address and phone as *Admin → Settings → Contact*
   (it feeds the LocalBusiness data on `/contact`).
6. **Test rich results**: https://search.google.com/test/rich-results with a blog post and `/careers/<job>`.
7. **Speed check**: https://pagespeed.web.dev on the home page and one service page.
