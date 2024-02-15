import stylex from '@stylexjs/stylex';
import AdminButtons from './AdminButtons';
import LikeButton from './LikeButton';
import Content from './Content';
import { flex, layout } from '@/app/global.stylex';

type Props = {
  id: string;
  title: string;
  content: string;
  spoiler: string;
  createdAt: string;
  likeCount: number;
};

export default function Post({
  id,
  title,
  spoiler,
  content,
  createdAt,
  likeCount,
}: Props) {
  return (
    <div {...stylex.props(layout.default)}>
      <div {...stylex.props(flex.row, styles.header)}>
        <h1 {...stylex.props(flex.column, styles.title)}>
          {title}
          <div {...stylex.props(styles.postDetail)}>{spoiler}</div>
          <div {...stylex.props(styles.postDetail)}>{createdAt}</div>
          <div {...stylex.props(styles.postDetail)}>
            {new Date().toLocaleString()}
          </div>
        </h1>
        <div {...stylex.props(styles.rightItems)}>
          <AdminButtons />
          <LikeButton initialCount={likeCount} postId={id} />
        </div>
      </div>
      <Content source={content} />
    </div>
  );
}

const styles = stylex.create({
  header: {
    margin: '10px',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: 'white',
    filter: 'brightness(0.95)',
  },
  title: {
    flexGrow: 1,
    gap: '10px',
  },
  postDetail: {
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
