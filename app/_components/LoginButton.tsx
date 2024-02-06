'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import useLoggedIn from '../_hooks/useLoggedIn';

export function LoginButton() {
  const loggedIn = useLoggedIn();
  const router = useRouter();

  const logout = useCallback(() => {
    fetch('/api/logout', { method: 'POST' }).then(() => {
      router.refresh();
    });
  }, [router]);

  if (loggedIn) {
    return (
      <>
        <Link href={'/write'}>
          <button>go to write!</button>
        </Link>
        <button onClick={logout}>로그아웃</button>
      </>
    );
  }

  return (
    <Link href={'/login'}>
      <button>로그인</button>
    </Link>
  );
}
