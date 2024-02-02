'use client';

import useLoggedIn from '@/app/_hooks/useLoggedIn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

export default function AdminButtons() {
  const loggedIn = useLoggedIn();
  const pathname = usePathname();

  const deletePost = useCallback(() => {
    console.log('아직 구현중');
  }, []);

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
