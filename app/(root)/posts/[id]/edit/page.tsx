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
  const createdAtStr = formData.get('createdAt')?.toString();
  const createdAt = createdAtStr ? new Date(createdAtStr) : undefined;
  if (id && title && content && spoiler) {
    await PostsService.updatePost(id, {
      title,
      content,
      spoiler,
      isPrivate,
      createdAt,
    });
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

export default async function Page({ params }: { params: { id: string } }) {
  const post = await PostsService.getPostById(params.id);
  if (!post) {
    throw new Error(`cannot find post id: ${params.id}`);
  }

  const { title, content, spoiler, isPrivate, createdAt } = post;

  // datetime-local 형식: YYYY-MM-DDTHH:mm
  const formatDateTimeLocal = (date: Date) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  const createdAtValue = createdAt
    ? formatDateTimeLocal(new Date(createdAt))
    : undefined;

  return (
    <EditForm
      id={params.id}
      title={title}
      spoiler={spoiler}
      content={content}
      isPrivate={isPrivate ?? false}
      createdAt={createdAtValue}
      handleSubmit={handleSubmit}
    />
  );
}
