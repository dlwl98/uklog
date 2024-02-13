'use client';

import stylex from '@stylexjs/stylex';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { button } from '@/app/global.stylex';
import { withClient } from '../_components/withClient';

export const LoginButton = withClient(() => {
  const [cookies] = useCookies(['loggedIn']);
  const router = useRouter();
  const pathname = usePathname();

  const logout = useCallback(() => {
    fetch('/api/logout', { method: 'POST' }).then(() => {
      router.refresh();
    });
  }, [router]);

  if (cookies.loggedIn) {
    return (
      <>
        <Link href={'/write'}>
          <button {...stylex.props(button.default)}>글쓰기</button>
        </Link>
        <button {...stylex.props(button.default)} onClick={logout}>
          로그아웃
        </button>
      </>
    );
  }

  return (
    <Link href={`/login?redirect=${pathname}`}>
      <button {...stylex.props(button.default, styles.loginButton)}>
        관리자 로그인
      </button>
    </Link>
  );
});

const styles = stylex.create({
  loginButton: {
    borderWidth: 0,
    fontSize: '0.75rem',
    color: 'lightgray',
    textDecoration: 'underline',
  },
});
