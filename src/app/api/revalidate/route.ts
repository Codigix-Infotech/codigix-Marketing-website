import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';

// Called by the backend after admin edits: POST { tags: string[] } with x-revalidate-secret.
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET || '';
  const given = request.headers.get('x-revalidate-secret') || '';
  const ok =
    secret.length > 0 &&
    given.length === secret.length &&
    timingSafeEqual(Buffer.from(given), Buffer.from(secret));
  if (!ok) return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const tags: unknown[] = Array.isArray(body?.tags) ? body.tags : [];
  const valid = tags.filter((t): t is string => typeof t === 'string' && t.length > 0 && t.length < 300);
  valid.forEach((tag) => revalidateTag(tag));

  // Settings feed the shared layout (navbar/footer), so refresh every page.
  if (valid.includes('settings')) revalidatePath('/', 'layout');

  return NextResponse.json({ revalidated: valid, now: Date.now() });
}
