import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import EditForm from '@/app/_components/EditForm';
import { PostsService } from '@/app/_lib/posts/Posts.service';

async function handleSubmit(formData: FormData) {
  'use server';
  const id = formData.get('id')?.toString();
  const title = formData.get('title')?.toString();
  const content = formData.get('content')?.toString();
  const spoiler = formData.get('spoiler')?.toString();
  if (title && content && spoiler) {
    await PostsService.updatePost(id!, { title, content, spoiler });
    revalidatePath('/');
    revalidatePath(`/posts/${id}`);
    revalidatePath(`/posts/${id}/edit`);
    redirect(`/posts/${id}`);
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const post = await PostsService.getPostById(params.id);
  if (!post) {
    throw new Error(`cannot find post id: ${params.id}`);
  }

  const { title, content, spoiler } = post;

  return (
    <EditForm
      id={params.id}
      title={title}
      spoiler={spoiler}
      content={content}
      handleSubmit={handleSubmit}
    />
  );
}

export async function generateStaticParams() {
  const posts = await PostsService.getPosts();

  return posts.map(({ _id }) => ({
    id: _id.toString(),
  }));
}
