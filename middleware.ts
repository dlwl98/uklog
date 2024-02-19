import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import {
  AUTH_REQUIRE_PATHS,
  AUTH_REQUIRE_PATH_MAP,
  COOKIE_KEY,
  PATH_REGEXP_MAP,
} from './constants';

function isAuthRequire(pathname: string, method: string) {
  for (const path of AUTH_REQUIRE_PATHS) {
    if (
      pathname.match(PATH_REGEXP_MAP[path]) &&
      AUTH_REQUIRE_PATH_MAP[path].method === method
    ) {
      return {
        authRequire: true,
        redirect: AUTH_REQUIRE_PATH_MAP[path].redirect,
      };
    }
  }
  return { authRequire: false, redirect: false };
}

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
  const { authRequire, redirect } = isAuthRequire(
    request.nextUrl.pathname,
    request.method,
  );

  if (!authRequire) {
    return NextResponse.next();
  }

  // Authentication Require
  const loggedIn = await authenticate(request);
  if (loggedIn) {
    return NextResponse.next();
  }

  // Authentication Fail
  if (redirect) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${request.nextUrl.pathname}`, request.url),
      { headers: { 'Set-Cookie': `${COOKIE_KEY.LOGGED_IN}=false; Path=/` } },
    );
  }

  return NextResponse.error();
}
