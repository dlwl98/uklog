import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { PostsService } from '@/app/_lib/posts/Posts.service';
import EditForm from '@/app/_components/EditForm';

async function handleSubmit(formData: FormData) {
  'use server';
  const title = formData.get('title')?.toString();
  const content = formData.get('content')?.toString();
  const spoiler = formData.get('spoiler')?.toString();
  if (title && content && spoiler) {
    const { _id } = await PostsService.createPost({ title, content, spoiler });
    revalidatePath('/');
    redirect(`/posts/${_id}`);
  }
}

export default async function Page() {
  return (
    <EditForm title="" spoiler="" content="" handleSubmit={handleSubmit} />
  );
}
