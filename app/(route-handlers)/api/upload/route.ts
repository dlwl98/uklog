import { putObject, s3 } from '@/app/_utils/s3';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  try {
    await putObject(file.name, file);
    const { protocol, host } = s3.endpoint;
    const fileUrl = new URL(
      file.name,
      `${protocol}//${process.env.AWS_BUCKET_NAME}.${host}`,
    );

    return NextResponse.json({
      href: fileUrl.toString(),
      message: 'File upload success',
    });
  } catch (error) {
    return NextResponse.json({ message: 'File upload fail' }, { status: 500 });
  }
}
