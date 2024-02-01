'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export function LoginButton() {
  const [cookies, , removeCookies] = useCookies(['loggedIn', 'token']);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  const logout = useCallback(() => {
    removeCookies('token');
    router.refresh();
  }, [removeCookies, router]);

  useEffect(() => {
    setLoggedIn(cookies.loggedIn === true);
  }, [cookies]);

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
