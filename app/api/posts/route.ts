import { PostsService } from '@/app/_lib/posts/Posts.service';
import { CreatePostDto } from '@/app/_lib/posts/dto/create-post.dto';

export async function GET() {
  try {
    const posts = await PostsService.getPosts();
    return Response.json(posts);
  } catch (error) {
    return new Response(JSON.stringify({ error, message: 'posts GET error' }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const body: CreatePostDto = await req.json();
    const newPost = await PostsService.createPost(body);

    return Response.json(newPost);
  } catch (error) {
    return new Response(
      JSON.stringify({ error, message: 'posts POST error' }),
      { status: 500 },
    );
  }
}
