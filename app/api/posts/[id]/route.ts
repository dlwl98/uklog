import { PostsService } from '@/app/_lib/posts/Posts.service';
import { revalidatePath } from 'next/cache';

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
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const deletedPost = await PostsService.deletePost(params.id);
    revalidatePath('/');

    return Response.json(deletedPost);
  } catch (error) {
    return new Response(
      JSON.stringify({ error, message: 'posts DELETE error' }),
      { status: 500 },
    );
  }
}
