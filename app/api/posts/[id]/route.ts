import { PostsService } from '@/app/_lib/posts/Posts.service';

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
