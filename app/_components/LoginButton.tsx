'use client';

import stylex from '@stylexjs/stylex';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import useLoggedIn from '../_hooks/useLoggedIn';
import { button } from '../global.stylex';

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
          <button {...stylex.props(button.default)}>글쓰기</button>
        </Link>
        <button {...stylex.props(button.default)} onClick={logout}>
          로그아웃
        </button>
      </>
    );
  }

  return (
    <Link href={'/login'}>
      <button {...stylex.props(button.default, styles.loginButton)}>
        관리자 로그인
      </button>
    </Link>
  );
}

const styles = stylex.create({
  loginButton: {
    borderWidth: 0,
    fontSize: '0.75rem',
    color: 'lightgray',
    textDecoration: 'underline',
  },
});
