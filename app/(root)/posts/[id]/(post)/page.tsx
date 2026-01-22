import { redirect } from 'next/navigation';
import { PostsService } from '@/app/_lib/posts/Posts.service';
import Post from './Post';
import { PostPageProps } from './layout';

export default async function Page({ params }: PostPageProps) {
  const { id } = await params;
  const post = await PostsService.getPostById(id);

  if (!post) {
    throw new Error(`cannot find post id: ${id}`);
  }
  if (post.isPrivate) {
    return redirect(`/posts/${post._id.toString()}/private`);
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
