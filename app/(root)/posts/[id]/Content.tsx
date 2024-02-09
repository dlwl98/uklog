'use client';

import MDEditor from '@uiw/react-md-editor';
import stylex from '@stylexjs/stylex';
import { layout } from '@/app/global.stylex';

export default function Content({ source }: { source: string }) {
  return (
    <div
      {...stylex.props(layout.default, styles.layout)}
      data-color-mode="light"
    >
      <MDEditor.Markdown source={source} {...stylex.props(styles.md)} />
    </div>
  );
}

const styles = stylex.create({
  layout: { padding: '10px' },
  md: {
    fontFamily: 'Pretendard',
  },
});
