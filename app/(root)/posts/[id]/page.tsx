import stylex from '@stylexjs/stylex';
import { PostsService } from '@/app/_lib/posts/Posts.service';
import { flex, layout } from '@/app/global.stylex';
import LikeButton from './LikeButton';
import AdminButtons from './AdminButtons';
import Content from './Content';

export default async function Page({ params }: { params: { id: string } }) {
  const post = await PostsService.getPostById(params.id);
  if (!post) {
    throw new Error(`cannot find post id: ${params.id}`);
  }

  const { title, content, createdAt, likes } = post;

  return (
    <div {...stylex.props(layout.default)}>
      <div {...stylex.props(flex.row, styles.header)}>
        <h1 {...stylex.props(flex.column, styles.title)}>
          {title}
          <div {...stylex.props(styles.createdAt)}>
            {new Date(createdAt).toISOString().slice(0, 10)}
          </div>
        </h1>
        <div {...stylex.props(styles.rightItems)}>
          <AdminButtons />
          <LikeButton
            initialCount={likes.length}
            postId={post._id.toString()}
          />
        </div>
      </div>
      <Content source={content} />
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await PostsService.getPosts();

  return posts.map(({ _id }) => ({
    id: _id.toString(),
  }));
}

const styles = stylex.create({
  header: {
    margin: '20px',
  },
  title: {
    flexGrow: 1,
    gap: '10px',
    fontSize: '2.5rem',
    fontWeight: 900,
  },
  createdAt: {
    fontWeight: 300,
    fontSize: '0.8rem',
    color: 'gray',
  },
  rightItems: {
    width: '100px',
    alignSelf: 'flex-end',
    textAlign: 'end',
    alignItems: 'end',
    fontWeight: 300,
    fontSize: '0.8rem',
    color: 'gray',
  },
});
