export function getRequestIp(req: Request) {
  return (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
}
