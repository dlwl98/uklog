import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { COOKIE_KEY } from './constants';

function isLoginRequire(pathname: string) {
  const loginRequirePathMatchers = [/\/write/, /\/posts\/[^\/]+\/edit$/];
  for (const matcher of loginRequirePathMatchers) {
    if (pathname.match(matcher)) {
      return true;
    }
  }
  return false;
}

async function authenticate(request: NextRequest) {
  const token = request.cookies.get(COOKIE_KEY.TOKEN)?.value;
  if (!token) {
    return false;
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
    return true;
  } catch {
    return false;
  }
}

function generateUnauthorizedResponse() {
  const response = new NextResponse();
  response.cookies.delete(COOKIE_KEY.TOKEN);
  response.cookies.set(COOKIE_KEY.LOGGED_IN, 'false');
  return response;
}

export async function middleware(request: NextRequest) {
  const loggedIn = await authenticate(request);
  if (loggedIn) {
    return NextResponse.next();
  }

  const responseInit = generateUnauthorizedResponse();
  if (isLoginRequire(request.nextUrl.pathname)) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${request.nextUrl.pathname}`, request.url),
    );
  }
  return NextResponse.next(responseInit);
}
