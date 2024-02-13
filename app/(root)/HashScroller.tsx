'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useLayoutEffect } from 'react';
import { withClient } from '../_components/withClient';

export const HashScroller = withClient(({ offset }: { offset: number }) => {
  const pathname = usePathname();

  const scrollIntoView = useCallback(() => {
    if (window.location.hash !== '') {
      const decodedHash = decodeURIComponent(window.location.hash.slice(1));
      const target = document.getElementById(decodedHash);
      const top = target?.getBoundingClientRect().top ?? 0;
      window.scrollTo({ top: top + window.scrollY - offset });
    }
  }, [offset]);

  useLayoutEffect(() => {
    scrollIntoView();
  }, [pathname, scrollIntoView]);

  useLayoutEffect(() => {
    window.addEventListener('hashchange', scrollIntoView);
    return () => {
      window.removeEventListener('hashchange', scrollIntoView);
    };
  }, [scrollIntoView]);

  return null;
});
