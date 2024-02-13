'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';

export default function ScrollTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.location.hash === '') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
