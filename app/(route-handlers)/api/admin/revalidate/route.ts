import { NextRequest } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');
  const path = request.nextUrl.searchParams.get('path');

  tag && revalidateTag(tag, 'default');
  path && revalidatePath(path);

  return Response.json({ revalidated: true });
}
