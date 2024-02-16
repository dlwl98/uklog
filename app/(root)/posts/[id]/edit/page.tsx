import { redirect } from 'next/navigation';
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import EditForm from '@/app/_components/EditForm';
import { PostsService } from '@/app/_lib/posts/Posts.service';

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
    // revalidatePath(`/posts/${id}`);
    // revalidatePath(`/posts/${id}/private`);
    redirect(`/posts/${id}`);
  }
}

// export const revalidate = 0;

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

export async function generateStaticParams() {
  const posts = await PostsService.getPosts();

  return posts.map(({ _id }) => ({
    id: _id.toString(),
  }));
}
