'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import stylex from '@stylexjs/stylex';
import { flex } from '@/app/global.stylex';
import useLoggedIn from '@/app/_hooks/useLoggedIn';

export default function AdminButtons() {
  const loggedIn = useLoggedIn();
  const pathname = usePathname();
  const router = useRouter();

  const deletePost = useCallback(() => {
    if (confirm('삭제합니까?')) {
      fetch(`/api${pathname}`, { method: 'DELETE' }).then(() => {
        router.replace('/');
      });
    }
  }, [router, pathname]);

  if (!loggedIn) {
    return <></>;
  }

  return (
    <div {...stylex.props(flex.row, styles.wrapper)}>
      <Link href={`${pathname}/edit`}>
        <button {...stylex.props(styles.button)}>수정</button>
      </Link>
      <button {...stylex.props(styles.button)} onClick={deletePost}>
        삭제
      </button>
    </div>
  );
}

const styles = stylex.create({
  wrapper: {
    justifyContent: 'flex-end',
    gap: '5px',
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    fontSize: '0.8rem',
    cursor: 'pointer',
    textDecoration: {
      default: 'none',
      ':hover': 'underline',
    },
    color: 'black',
  },
});
