import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

/* Called by /admin after a save so edits show up immediately instead of
   waiting out the ISR window. Only busts cache for site paths — harmless. */
export async function POST(request: Request) {
  const body: { paths?: unknown } = await request.json().catch(() => ({}));
  const paths: string[] = Array.isArray(body.paths)
    ? body.paths.filter((p: unknown): p is string => typeof p === 'string' && p.startsWith('/'))
    : [];
  paths.forEach((path) => revalidatePath(path));
  return NextResponse.json({ revalidated: paths });
}
