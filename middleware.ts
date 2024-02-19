import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { COOKIE_KEY } from './constants';

function isLoginRequire(pathname: string) {
  const loginRequirePathMatchers = [
    /\/write/,
    /\/posts\/[^\/]+\/edit$/,
    /\/posts\/[^\/]+\/private$/,
  ];
  for (const matcher of loginRequirePathMatchers) {
    if (pathname.match(matcher)) {
      return true;
    }
  }
  return false;
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
  if (!isLoginRequire(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const loggedIn = await authenticate(request);
  if (loggedIn) {
    return NextResponse.next();
  }

  return NextResponse.redirect(
    new URL(`/login?redirect=${request.nextUrl.pathname}`, request.url),
    { headers: { 'Set-Cookie': `${COOKIE_KEY.LOGGED_IN}=false; Path=/` } },
  );
}
