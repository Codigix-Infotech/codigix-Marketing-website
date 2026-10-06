import env from '../config/env.js';

/**
 * Ask the Next.js site to drop cached pages for the given cache tags so admin
 * edits show up immediately. Fire-and-forget: failures only log a warning,
 * pages still refresh on their normal ISR interval.
 */
export async function revalidate(...tags) {
  if (!env.revalidateSecret) return;
  const tagList = [...new Set(tags.flat())];
  if (tagList.length === 0) return;
  const body = JSON.stringify({ tags: tagList });

  const candidateUrls = [
    env.siteUrl,
    'http://localhost:3002',
    'http://localhost:3000',
    'http://127.0.0.1:3002',
    'http://127.0.0.1:3000',
  ].filter(Boolean);

  const targets = [...new Set(candidateUrls)];

  for (const url of targets) {
    try {
      const res = await fetch(`${url}/api/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-revalidate-secret': env.revalidateSecret },
        body,
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        console.log(`[revalidate] Synced [${tagList.join(', ')}] with frontend on ${url}`);
        return;
      }
    } catch {
      // Continue to next port if this one is not currently running
    }
  }
}
