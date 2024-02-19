import { revalidatePath } from 'next/cache';
import { PostsService } from '@/app/_lib/posts/Posts.service';
import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const post = await PostsService.getPostById(params.id);
    return Response.json(post);
  } catch (error) {
    return new Response(
      JSON.stringify({ error, message: 'posts/[id] GET error' }),
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      throw Error();
    }

    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
    const deletedPost = await PostsService.deletePost(params.id);
    revalidatePath('/');
    revalidatePath(`/posts/${params.id}`);
    revalidatePath(`/posts/${params.id}/private`);

    return Response.json(deletedPost);
  } catch (error) {
    return new Response(
      JSON.stringify({ error, message: 'posts DELETE error' }),
      { status: 500 },
    );
  }
}
