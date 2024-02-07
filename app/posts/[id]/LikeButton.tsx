'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function LikeButton({
  likes,
  postId,
}: {
  likes: string[];
  postId: string;
}) {
  const [ip, setIp] = useState<string | null>(null);
  const liked = useMemo(
    () => (ip ? new Set(likes).has(ip) : false),
    [ip, likes],
  );
  const router = useRouter();

  useEffect(() => {
    if (!ip) {
      fetch('/api/ip')
        .then((res) => res.json())
        .then(({ ip }) => {
          setIp(ip);
        });
    }
  }, [ip]);

  const handleClick = useCallback(() => {
    if (!ip) {
      return;
    }

    if (liked) {
      fetch(`/api/posts/${postId}/like`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then(() => router.refresh());
    } else {
      fetch(`/api/posts/${postId}/like`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
        .then((res) => res.json())
        .then(() => router.refresh());
    }
  }, [ip, liked, router, postId]);

  return <button onClick={handleClick}>{liked ? '❤️' : '🤍'}</button>;
}
