// import stylex from '@stylexjs/stylex';
import { LoginButton } from './_components/LoginButton';
import { PostsService } from './_lib/posts/Posts.service';
import Link from 'next/link';

export const revalidate = 30;

export default async function Page() {
  const posts = await PostsService.getPosts();

  return (
    <main>
      <div>
        <h1>uklog</h1>
        <LoginButton />
        {posts.map(({ _id, title, content, createdAt, likes }) => (
          <Link
            key={_id.toString()}
            href={`/posts/${_id}`}
            style={{ margin: '5px' }}
          >
            <h3>{title}</h3>
            <div>{content}</div>
            <div>likes: {likes.length}</div>
            <div>{new Date(createdAt).toLocaleString()}</div>
          </Link>
        ))}
      </div>
      <div>{new Date().toLocaleString()}</div>
    </main>
  );
}

// const styles = stylex.create({
//   page: {},
//   post: {
//     backgroundColor: 'lightblue',
//     margin: '5px',
//   },
// });
