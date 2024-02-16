import { PostsService } from '@/app/_lib/posts/Posts.service';
import Post from '../Post';
import { unstable_cache } from 'next/cache';

async function getPost(id: string) {
  return unstable_cache(
    async () => {
      return PostsService.getPostById(id);
    },
    ['posts', id],
    {
      tags: [`/posts/${id}`],
    },
  )();
}

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  if (!post) {
    throw new Error(`cannot find post id: ${params.id}`);
  }

  const { _id, title, content, spoiler, createdAt, likes } = post;

  return (
    <Post
      id={_id.toString()}
      title={title}
      spoiler={spoiler}
      content={content}
      createdAt={new Date(createdAt)
        .toISOString()
        .slice(0, 10)
        .replaceAll('-', '.')}
      likeCount={likes.length}
    />
  );
}

export async function generateStaticParams() {
  const posts = await PostsService.getPosts();

  return posts.map(({ _id }) => ({
    id: _id.toString(),
  }));
}
