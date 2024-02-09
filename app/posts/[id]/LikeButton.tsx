'use client';

import { flex } from '@/app/global.stylex';
import stylex from '@stylexjs/stylex';
import { useCallback, useEffect, useState } from 'react';

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
        {isLike ? '❤️' : '🤍'}
      </button>
    </div>
  );
}

const styles = stylex.create({
  wrapper: {
    gap: '5px',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    cursor: 'pointer',
    fontSize: '1.5rem',
  },
});
