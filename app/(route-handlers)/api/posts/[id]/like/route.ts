import { PostsService } from '@/app/_lib/posts/Posts.service';
import { getRequestIp } from '@/app/_utils/getRequestIp';

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const requestIp = getRequestIp(req);
    const post = await PostsService.getPostById(params.id);
    if (!post) {
      throw new Error('post nor found');
    }
    return Response.json({
      count: post.likes.length,
      isLike: post.likes.some((ip) => ip === requestIp),
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error, message: 'posts/[id]/like GET error' }),
      {
        status: 500,
      },
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const post = await PostsService.createLike(params.id, getRequestIp(req));
    return Response.json(post);
  } catch (error) {
    return new Response(
      JSON.stringify({ error, message: 'posts/[id]/like POST error' }),
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
    return Response.json(post);
  } catch (error) {
    return new Response(
      JSON.stringify({ error, message: 'posts/[id]/like DELETE error' }),
      {
        status: 500,
      },
    );
  }
}
