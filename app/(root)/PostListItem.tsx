import Link from 'next/link';
import stylex from '@stylexjs/stylex';
import { flex } from './global.stylex';

type Props = {
  id: string;
  title: string;
  spoiler: string;
  isPrivate: boolean;
  createdAt: string;
};

export default function PostListItem({
  id,
  title,
  spoiler,
  createdAt,
  isPrivate,
}: Props) {
  return (
    <Link href={`/posts/${id}${isPrivate ? '/private' : ''}`}>
      <div {...stylex.props(flex.column, styles.post)}>
        <h2 {...stylex.props(flex.row, styles.title)}>
          {title}
          {isPrivate && (
            <span {...stylex.props(styles.privateTooltip)}>작성중</span>
          )}
        </h2>
        <div {...stylex.props(styles.postDetail)}>{spoiler}</div>
        <div {...stylex.props(styles.postDetail)}>{createdAt}</div>
      </div>
    </Link>
  );
}

const styles = stylex.create({
  post: {
    gap: '10px',
    width: '100%',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '15px',
    paddingBottom: '15px',
    borderRadius: '8px',
    backgroundColor: 'white',
    filter: {
      default: 'none',
      ':hover': 'brightness(0.9)',
    },
    transition: 'filter 0.5s ease',
  },
  title: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
    alignItems: 'flex-start',
  },
  privateTooltip: {
    backgroundColor: '#F3B95F',
    fontSize: '0.8rem',
    lineHeight: '0.9rem',
    borderRadius: '3px',
    padding: '3px',
    margin: '7px',
    whiteSpace: 'nowrap',
  },
  postDetail: {
    fontWeight: 300,
    fontSize: '0.8rem',
    color: 'gray',
  },
});
