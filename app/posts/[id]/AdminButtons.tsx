'use client';

import useLoggedIn from '@/app/_hooks/useLoggedIn';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

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
    <>
      <Link href={`${pathname}/edit`}>
        <button>수정</button>
      </Link>
      <button onClick={deletePost}>삭제</button>
    </>
  );
}
