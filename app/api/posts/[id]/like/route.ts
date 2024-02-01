import { PostsService } from '@/app/_lib/posts/Posts.service';
import { revalidatePath } from 'next/cache';

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { liked }: { liked: string } = await req.json();
    const post = await PostsService.createLike(params.id, liked);
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
    const { liked }: { liked: string } = await req.json();
    const post = await PostsService.deleteLike(params.id, liked);
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
