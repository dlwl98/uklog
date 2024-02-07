import { getRequestIp } from '@/app/_utils/getRequestIp';

export async function GET(req: Request) {
  return Response.json({ ip: getRequestIp(req) });
}
