import { verifyPassword } from '../_utils/crypto';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';
import { redirect } from 'next/navigation';
import Link from 'next/link';

async function handleSubmit(formData: FormData) {
  'use server';
  const password = formData.get('password')?.toString();
  if (password) {
    if (verifyPassword(password)) {
      const token = await new SignJWT({ user: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('72h')
        .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

      cookies().set('token', token, {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
      });

      redirect('/');
    }
  }
}

export default async function Page() {
  return (
    <div>
      <Link href="/">리스트로</Link>
      <div>관리자 로그인</div>
      <form action={handleSubmit}>
        <div>
          <span>password</span>
          <input type="password" name="password" />
        </div>
        <button type="submit">확인</button>
      </form>
    </div>
  );
}
