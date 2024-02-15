export async function POST() {
  return Response.json(null, {
    headers: { 'Set-Cookie': 'token=deleted; Path=/' },
  });
}
