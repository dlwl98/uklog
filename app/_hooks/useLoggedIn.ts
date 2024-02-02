'use client';

import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export default function useLoggedIn() {
  const [cookies] = useCookies(['loggedIn']);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(cookies.loggedIn === true);
  }, [cookies]);

  return loggedIn;
}
