'use client';

import { useCallback } from 'react';
import { useCookies } from 'react-cookie';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import stylex from '@stylexjs/stylex';
import { flex } from '@/app/(root)/global.stylex';
import { withClient } from '@/app/_components/withClient';
import { COOKIE_KEY } from '@/constants';

const AdminButtons = withClient(() => {
  const [cookies] = useCookies([COOKIE_KEY.LOGGED_IN]);
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const deletePost = useCallback(async () => {
    if (confirm('삭제합니까?')) {
      await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      await Promise.all([
        fetch('/api/revalidate?path=/'),
        fetch(`/api/revalidate?path=/posts/${id}`),
        fetch(`/api/revalidate?path=/posts/${id}/private`),
      ]);
      router.replace('/');
    }
  }, [router, id]);

  if (!cookies.loggedIn) {
    return null;
  }

  return (
    <div {...stylex.props(flex.row, styles.wrapper)}>
      <Link href={`/posts/${id}/edit`}>
        <button {...stylex.props(styles.button)}>수정</button>
      </Link>
      <button {...stylex.props(styles.button)} onClick={deletePost}>
        삭제
      </button>
    </div>
  );
});

const styles = stylex.create({
  wrapper: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    gap: '5px',
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    fontSize: '0.8rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    textDecoration: {
      default: 'none',
      ':hover': 'underline',
    },
    color: 'black',
  },
});

export default AdminButtons;
