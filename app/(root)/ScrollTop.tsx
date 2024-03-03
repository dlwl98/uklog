'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';

export default function ScrollTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.location.hash === '') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return null;
}
