import Link from 'next/link';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { PostsService } from '@/app/_lib/posts/Posts.service';

async function handleSubmit(formData: FormData) {
  'use server';
  const title = formData.get('title')?.toString();
  const content = formData.get('content')?.toString();
  if (title && content) {
    const { _id } = await PostsService.createPost({ title, content });
    revalidatePath('/');
    redirect(`/posts/${_id}`);
  }
}

export default async function Page() {
  return (
    <div>
      <Link href="/">
        <button>리스트로</button>
      </Link>
      <form action={handleSubmit}>
        <div>
          <span>title</span>
          <input type="text" name="title" />
        </div>
        <div>
          <span>content</span>
          <input type="text" name="content" />
        </div>
        <button type="submit">post!</button>
      </form>
    </div>
  );
}
