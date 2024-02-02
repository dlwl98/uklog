import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    const response = NextResponse.next();
    response.cookies.set('loggedIn', 'false');
    return response;
  }

  const response = NextResponse.next();
  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
    response.cookies
      .set('loggedIn', 'true')
      .set('token', token, { httpOnly: true });
  } catch (error) {
    response.cookies.set('loggedIn', 'false');
  } finally {
    return response;
  }
}
