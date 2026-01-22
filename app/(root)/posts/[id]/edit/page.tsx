import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
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
    revalidatePath(`/posts/${id}`);
    revalidatePath(`/posts/${id}/private`);
    redirect(`/posts/${id}`);
  }
}

export const revalidate = 0;

export const metadata: Metadata = {
  title: `게시글 수정`,
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await PostsService.getPostById(id);
  if (!post) {
    throw new Error(`cannot find post id: ${id}`);
  }

  const { title, content, spoiler, isPrivate } = post;

  return (
    <EditForm
      id={id}
      title={title}
      spoiler={spoiler}
      content={content}
      isPrivate={isPrivate ?? false}
      handleSubmit={handleSubmit}
    />
  );
}
