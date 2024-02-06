import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

function isLoginRequire(pathname: string) {
  const loginRequirePathMatchers = [/\/write/, /\/posts\/[^\/]+\/edit$/];
  for (const matcher of loginRequirePathMatchers) {
    if (pathname.match(matcher)) {
      return true;
    }
  }
  return false;
}

export async function middleware(request: NextRequest) {
  const response = new NextResponse();
  const token = request.cookies.get('token')?.value;

  try {
    if (!token) {
      throw new Error('Token not found');
    }
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
    response.cookies
      .set('loggedIn', 'true')
      .set('token', token, { httpOnly: true });
    return NextResponse.next(response);
  } catch (error) {
    response.cookies.set('loggedIn', 'false');
    if (isLoginRequire(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next(response);
  }
}
