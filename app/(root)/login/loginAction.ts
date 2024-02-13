'use server';

import { verifyPassword } from '@/app/_utils/crypto';
import { COOKIE_KEY } from '@/constants';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

export async function login(
  prevState: { message: string; success: boolean },
  formData: FormData,
) {
  const password = formData.get('password')?.toString();
  if (!password) {
    return { message: '비밀번호를 입력해주세요', success: false };
  }

  if (!verifyPassword(password)) {
    return { message: '비밀번호가 일치하지 않습니다', success: false };
  }

  const token = await new SignJWT({ user: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('72h')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

  cookies().set(COOKIE_KEY.LOGGED_IN, 'true');
  cookies().set(COOKIE_KEY.TOKEN, token, {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
  });

  return { message: '', success: true };
}
