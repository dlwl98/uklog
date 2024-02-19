import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { PostsService } from '@/app/_lib/posts/Posts.service';
import EditForm from '@/app/_components/EditForm';
import { Metadata } from 'next';

async function handleSubmit(formData: FormData) {
  'use server';
  const title = formData.get('title')?.toString();
  const content = formData.get('content')?.toString();
  const spoiler = formData.get('spoiler')?.toString();
  const isPrivate = Boolean(formData.get('isPrivate'));
  if (title && content && spoiler) {
    const { _id } = await PostsService.createPost({
      title,
      content,
      spoiler,
      isPrivate,
    });
    revalidatePath('/');
    redirect(`/posts/${_id}`);
  }
}

export const metadata: Metadata = {
  title: `게시글 작성`,
};

export default async function Page() {
  return (
    <EditForm
      title=""
      spoiler=""
      content=""
      isPrivate={true}
      handleSubmit={handleSubmit}
    />
  );
}
