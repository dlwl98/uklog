import { PostsService } from '@/app/_lib/posts/Posts.service';
import Link from 'next/link';
import LikeButton from './LikeButton';

export default async function Page({ params }: { params: { id: string } }) {
  const post = await PostsService.getPostById(params.id);
  if (!post) {
    throw new Error(`cannot find post id: ${params.id}`);
  }

  const { title, content, createdAt, likes } = post;

  return (
    <div>
      <Link href="/">
        <button>리스트로</button>
      </Link>
      <h3>{title}</h3>
      <div>{content}</div>
      <div>likes: {likes.length}</div>
      <LikeButton likes={likes} postId={post._id.toString()} />
      <div>{new Date(createdAt).toLocaleString()}</div>
      <div>{new Date().toLocaleString()}</div>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await PostsService.getPosts();

  return posts.map(({ _id }) => ({
    id: _id.toString(),
  }));
}
