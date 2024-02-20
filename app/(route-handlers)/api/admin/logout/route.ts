import { COOKIE_KEY } from '@/constants';

export async function POST() {
  const headers = new Headers();
  headers.append('Set-Cookie', `${COOKIE_KEY.TOKEN}=deleted; Path=/`);
  headers.append('Set-Cookie', `${COOKIE_KEY.LOGGED_IN}=false; Path=/`);

  return Response.json(null, {
    headers,
  });
}
