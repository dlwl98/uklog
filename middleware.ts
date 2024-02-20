import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { COOKIE_KEY } from './constants';

export type AUTH_REQUIRE_PATH = (typeof AUTH_REQUIRE_PATHS)[number];
export const AUTH_REQUIRE_PATHS = [
  '/write',
  '/posts/:id/edit',
  '/posts/:id/private',
  '/api/posts/:id',
  '/api/revalidate',
] as const;

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
  // Authentication Require
  const loggedIn = await authenticate(request);
  if (loggedIn) {
    return NextResponse.next();
  }

  // Authentication Fail
  if (true) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${request.nextUrl.pathname}`, request.url),
      { headers: { 'Set-Cookie': `${COOKIE_KEY.LOGGED_IN}=false; Path=/` } },
    );
  }

  return NextResponse.error();
}

export const config = {
  matcher: [
    '/write',
    '/posts/:id/edit',
    '/posts/:id/private',
    '/api/posts/:id',
    {
      source: '/api/revalidate',
      has: [{ type: 'header', key: ':method', value: 'GET' }],
    },
  ],
};

export const AUTH_REQUIRE_PATH_MAP: {
  [key in AUTH_REQUIRE_PATH]: {
    method: string;
    redirect: boolean;
  };
} = {
  '/write': {
    method: 'GET',
    redirect: true,
  },
  '/posts/:id/edit': {
    method: 'GET',
    redirect: true,
  },
  '/posts/:id/private': {
    method: 'GET',
    redirect: true,
  },
  '/api/posts/:id': {
    method: 'DELETE',
    redirect: false,
  },
  '/api/revalidate': {
    method: 'GET',
    redirect: false,
  },
};
