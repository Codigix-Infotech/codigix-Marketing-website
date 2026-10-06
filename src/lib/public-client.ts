'use client';

import { API_URL } from './config';

/** Browser-side POST to the public API (contact, newsletter, job applications). */
export async function submitPublic<T = { ok: boolean; message?: string }>(
  path: string,
  body: Record<string, unknown> | FormData
): Promise<T> {
  const isForm = typeof FormData !== 'undefined' && body instanceof FormData;
  const res = await fetch(`${API_URL}/api/public${path}`, {
    method: 'POST',
    headers: isForm ? undefined : { 'Content-Type': 'application/json' },
    body: isForm ? body : JSON.stringify(body),
  }).catch(() => {
    throw new Error('Could not reach the server. Please check your connection and try again.');
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
  return data as T;
}
