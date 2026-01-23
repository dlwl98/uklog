import { uploadFile } from '@/app/_utils/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  try {
    const href = await uploadFile(file.name, file);

    return NextResponse.json({
      href,
      message: 'File upload success',
    });
  } catch (error) {
    return NextResponse.json({ message: 'File upload fail' }, { status: 500 });
  }
}
