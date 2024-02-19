'use client';

import { useCallback, useEffect, useState } from 'react';
import stylex from '@stylexjs/stylex';
import Image from 'next/image';
import { flex } from '@/app/(root)/global.stylex';

export default function LikeButton({
  initialCount,
  postId,
}: {
  initialCount: number;
  postId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [isLike, setIsLike] = useState<boolean | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/posts/${postId}/like`)
      .then((res) => res.json())
      .then(({ count, isLike }) => {
        setCount(count);
        setIsLike(isLike);
      })
      .finally(() => setIsLoading(false));
  }, [postId]);

  const handleClick = useCallback(() => {
    if (isLike === null || isLoading) {
      return;
    }

    setIsLoading(true);
    if (isLike) {
      fetch(`/api/posts/${postId}/like`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      })
        .then(() => {
          setCount((prev) => prev - 1);
          setIsLike(false);
        })
        .finally(() => setIsLoading(false));
    } else {
      fetch(`/api/posts/${postId}/like`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
        .then(() => {
          setCount((prev) => prev + 1);
          setIsLike(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, [isLike, isLoading, postId]);

  return (
    <div {...stylex.props(flex.row, styles.wrapper)}>
      <div>{count}</div>
      <button {...stylex.props(styles.button)} onClick={handleClick}>
        {isLike ? (
          <Image
            src="/images/heart-fill.svg"
            alt="heart"
            width={30}
            height={30}
          />
        ) : (
          <Image src="/images/heart.svg" alt="heart" width={30} height={30} />
        )}
      </button>
    </div>
  );
}

const styles = stylex.create({
  wrapper: {
    gap: '5px',
    marginTop: '5px',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    cursor: 'pointer',
    height: '30px',
    textAlign: 'center',
  },
});
