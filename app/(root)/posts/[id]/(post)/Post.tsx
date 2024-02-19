import stylex from '@stylexjs/stylex';
import { flex, layout } from '@/app/(root)/global.stylex';
import { KoreaDate } from '@/app/_utils/KoreaDate';
import AdminButtons from './AdminButtons';
import LikeButton from './LikeButton';
import Content from './Content';

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
          <div {...stylex.props(styles.spoiler)}>{spoiler}</div>
          <div {...stylex.props(styles.postDetail)}>
            <span {...stylex.props(styles.postDetailKey)}>작성일 </span>
            {createdAt}
          </div>
          <div {...stylex.props(styles.postDetail)}>
            <span {...stylex.props(styles.postDetailKey)}>
              페이지가 생성된 시간{' '}
            </span>
            {new KoreaDate().toKRString()}
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
  spoiler: {
    fontWeight: 500,
    fontSize: '1rem',
    color: 'gray',
  },
  postDetail: {
    fontWeight: 200,
    fontSize: '0.8rem',
    color: 'gray',
  },
  postDetailKey: {
    fontWeight: 400,
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
