'use client';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import * as stylex from '@stylexjs/stylex';
import { layout } from '@/app/(root)/global.stylex';
import dynamic from 'next/dynamic';

export default function Content({ source }: { source: string }) {
  const Markdown = dynamic(() => import('@uiw/react-markdown-preview'));

  return (
    <div
      {...stylex.props(layout.default, styles.layout)}
      data-color-mode="light"
    >
      <Markdown source={source} />
    </div>
  );
}

const styles = stylex.create({
  layout: { padding: '10px' },
});
