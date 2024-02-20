import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { COOKIE_KEY } from './constants';

async function authenticate(request: NextRequest) {
  const token = request.cookies.get(COOKIE_KEY.TOKEN)?.value;
  const loggedIn = request.cookies.get(COOKIE_KEY.LOGGED_IN)?.value;

  if (!token || loggedIn !== 'true') {
    return false;
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const authorized = await authenticate(request);
  if (authorized) {
    return NextResponse.next();
  }

  if (!request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${request.nextUrl.pathname}`, request.url),
      { headers: { 'Set-Cookie': `${COOKIE_KEY.LOGGED_IN}=false; Path=/` } },
    );
  }

  return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
}

export const config = {
  matcher: [
    '/write',
    '/posts/:id/edit',
    '/posts/:id/private',
    '/api/admin/:path*',
  ],
};
