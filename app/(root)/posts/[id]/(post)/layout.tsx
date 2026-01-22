import { PostsService } from '@/app/_lib/posts/Posts.service';

export type PostPageProps = { params: Promise<{ id: string }> };

export const revalidate = 86400;

export async function generateMetadata({ params }: PostPageProps) {
  const { id } = await params;
  const post = await PostsService.getPostById(id);

  if (!post) {
    return {
      title: '게시글을 찾을 수 없습니다',
    };
  }

  return {
    title: post.title,
    description: post.spoiler,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
