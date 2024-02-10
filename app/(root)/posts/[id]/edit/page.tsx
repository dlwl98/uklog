import { PostsService } from '@/app/_lib/posts/Posts.service';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';

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
          <textarea name="content" defaultValue={content} />
        </div>
        <div>
          <span>spoiler</span>
          <input type="text" name="spoiler" defaultValue={spoiler} />
        </div>
        <button type="submit">post!</button>
      </form>
    </div>
  );
}
