import { cookies } from 'next/headers';

export function isLoggedIn() {
  return cookies().has('token');
}
