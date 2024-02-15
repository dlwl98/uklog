import stylex from '@stylexjs/stylex';
import { PostsService } from '@/app/_lib/posts/Posts.service';
import { flex, layout } from '@/app/global.stylex';
import PostListItem from './PostListItem';

export const revalidate = 30;

export default async function Page() {
  const posts = await PostsService.getPosts();

  return (
    <div {...stylex.props(flex.column, layout.default, styles.layout)}>
      {posts.map(({ _id, title, spoiler, createdAt, isPrivate }) => (
        <PostListItem
          key={_id.toString()}
          id={_id.toString()}
          title={title}
          spoiler={spoiler}
          isPrivate={isPrivate ?? false}
          createdAt={new Date(createdAt).toISOString().slice(0, 10)}
        />
      ))}
    </div>
  );
}

const styles = stylex.create({
  layout: {
    gap: '10px',
    flexDirection: 'column-reverse',
  },
});
