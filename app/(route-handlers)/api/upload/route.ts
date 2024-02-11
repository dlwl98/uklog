import { putObject, s3 } from '@/app/_utils/s3';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  try {
    await putObject(file.name, file);
    const { protocol, host } = s3.endpoint;

    return NextResponse.json({
      href: `${protocol}//${process.env.AWS_BUCKET_NAME}.${host}/${file.name}`,
      message: 'File upload success',
    });
  } catch (error) {
    return NextResponse.json({ message: 'File upload fail' }, { status: 500 });
  }
}
