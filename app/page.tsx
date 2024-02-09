import stylex from '@stylexjs/stylex';
import { PostsService } from './_lib/posts/Posts.service';
import Link from 'next/link';
import { flex, layout } from './global.stylex';

export const revalidate = 30;

export default async function Page() {
  const posts = await PostsService.getPosts();

  return (
    <>
      <div {...stylex.props(flex.column, layout.default, styles.layout)}>
        {posts.map(({ _id, title, createdAt }) => (
          <Link key={_id.toString()} href={`/posts/${_id}`}>
            <div {...stylex.props(flex.column, styles.post)}>
              <h2>{title}</h2>
              <div {...stylex.props(styles.createdAt)}>
                {new Date(createdAt).toISOString().slice(0, 10)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

const styles = stylex.create({
  layout: {
    gap: '10px',
    flexDirection: 'column-reverse',
  },
  post: {
    gap: '10px',
    width: '100%',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '15px',
    paddingBottom: '15px',
    borderRadius: '8px',
    backgroundColor: {
      default: 'inherit',
      ':hover': 'lightgray',
    },
  },
  createdAt: {
    fontWeight: 300,
    fontSize: '0.8rem',
  },
});
