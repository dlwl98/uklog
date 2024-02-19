import { redirect } from 'next/navigation';
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import EditForm from '@/app/_components/EditForm';
import { PostsService } from '@/app/_lib/posts/Posts.service';
import { Metadata } from 'next';

async function handleSubmit(formData: FormData) {
  'use server';
  const id = formData.get('id')?.toString();
  const title = formData.get('title')?.toString();
  const content = formData.get('content')?.toString();
  const spoiler = formData.get('spoiler')?.toString();
  const isPrivate = Boolean(formData.get('isPrivate'));
  if (id && title && content && spoiler) {
    await PostsService.updatePost(id, { title, content, spoiler, isPrivate });
    revalidatePath('/');
    revalidateTag(`/posts/${id}`);
    redirect(`/posts/${id}`);
  }
}

export const revalidate = 0;

export const metadata: Metadata = {
  title: `게시글 수정`,
};

export default async function Page({ params }: { params: { id: string } }) {
  const post = await PostsService.getPostById(params.id);
  if (!post) {
    throw new Error(`cannot find post id: ${params.id}`);
  }

  const { title, content, spoiler, isPrivate } = post;

  return (
    <EditForm
      id={params.id}
      title={title}
      spoiler={spoiler}
      content={content}
      isPrivate={isPrivate ?? false}
      handleSubmit={handleSubmit}
    />
  );
}
