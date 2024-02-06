'use client';

import stylex from '@stylexjs/stylex';
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
          <button {...stylex.props(styles.button)}>글쓰기</button>
        </Link>
        <button {...stylex.props(styles.button)} onClick={logout}>
          로그아웃
        </button>
      </>
    );
  }

  return (
    <Link href={'/login'}>
      <button {...stylex.props(styles.button, styles.loginButton)}>
        관리자 로그인
      </button>
    </Link>
  );
}

const styles = stylex.create({
  button: {
    padding: '6px',
    backgroundColor: 'transparent',
    borderRadius: '10px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'lightgray',
    cursor: 'pointer',
  },
  loginButton: {
    borderWidth: 0,
    fontSize: '0.75rem',
    color: 'lightgray',
    textDecoration: 'underline',
  },
});
