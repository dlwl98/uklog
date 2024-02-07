import { PostsService } from '@/app/_lib/posts/Posts.service';
import { getRequestIp } from '@/app/_utils/getRequestIp';
import { revalidatePath } from 'next/cache';

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const post = await PostsService.createLike(params.id, getRequestIp(req));
    revalidatePath(`/posts/${params.id}`);

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
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const post = await PostsService.deleteLike(params.id, getRequestIp(req));
    revalidatePath(`/posts/${params.id}`);

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
