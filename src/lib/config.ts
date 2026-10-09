/** Base URL of the Node.js API (see /backend). */
export const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

/** Public URL of this website — used for canonical URLs, sitemaps and JSON-LD. */
export const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://codigix.com').replace(/\/$/, '');

/**
 * Whether search engines may index this deployment. On by default, so a live server can never
 * be de-indexed by a missing setting; a staging/test server opts out with NEXT_PUBLIC_NOINDEX=true
 * (robots.txt then disallows everything and every page gets a noindex tag).
 */
export const INDEXABLE = process.env.NEXT_PUBLIC_NOINDEX !== 'true';

/**
 * Turn a stored media path into a usable URL.
 *  - absolute URLs are returned untouched
 *  - `/uploads/...` files live on the API server
 *  - anything else (e.g. `/logo.png`) is served from this site's /public folder
 */
export function mediaUrl(path?: string | null): string {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  
  // Normalize legacy logo extensions to webp
  let normalized = path;
  if (normalized.includes('/clients/') || normalized.includes('logo')) {
    normalized = normalized.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  }

  if (normalized.startsWith('/uploads/')) {
    // In browser on an online host, if API_URL points to localhost, use relative path so Next.js proxy/static serves it
    if (typeof window !== 'undefined') {
      const isWindowLocal = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);
      const isApiLocal = /^(https?:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?$/i.test(API_URL);
      if (!isWindowLocal && isApiLocal) {
        return normalized;
      }
    }
    return `${API_URL}${normalized}`;
  }
  return normalized;
}

/** Absolute URL for SEO tags (Open Graph, JSON-LD). */
export function absoluteUrl(path?: string | null): string {
  const url = mediaUrl(path);
  if (!url) return '';
  return /^https?:\/\//i.test(url) ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}
