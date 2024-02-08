import { PostsService } from '@/app/_lib/posts/Posts.service';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function handleSubmit(formData: FormData) {
  'use server';
  const id = formData.get('id')?.toString();
  const title = formData.get('title')?.toString();
  const content = formData.get('content')?.toString();
  if (title && content) {
    await PostsService.updatePost(id!, { title, content });
    revalidatePath('/');
    revalidatePath(`/posts/${id}`);
    redirect(`/posts/${id}`);
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const post = await PostsService.getPostById(params.id);
  if (!post) {
    throw new Error(`cannot find post id: ${params.id}`);
  }

  const { title, content } = post;

  return (
    <div>
      <Link href="/">
        <button>리스트로</button>
      </Link>
      <form action={handleSubmit}>
        <input type="hidden" name="id" defaultValue={params.id} readOnly />
        <div>
          <span>title</span>
          <input type="text" name="title" defaultValue={title} />
        </div>
        <div>
          <span>content</span>
          <input type="text" name="content" defaultValue={content} />
        </div>
        <button type="submit">post!</button>
      </form>
    </div>
  );
}
