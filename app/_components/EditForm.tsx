'use client';

import { useRef, useState } from 'react';
import stylex from '@stylexjs/stylex';
import Content from '@/app/(root)/posts/[id]/Content';

type Props = {
  handleSubmit: (formData: FormData) => Promise<void>;
  id?: string;
  title: string;
  spoiler: string;
  content: string;
};

export default function EditForm({
  handleSubmit,
  id,
  title,
  spoiler,
  content: initialContent,
}: Props) {
  const [isPreview, setIsPreview] = useState(false);
  const contentRef = useRef(initialContent);

  return (
    <form action={handleSubmit}>
      <input type="hidden" name="id" defaultValue={id} readOnly />

      <div {...stylex.props(styles.content)}>
        <span>content</span>
        <textarea
          {...stylex.props(
            styles.contentTextarea(!isPreview ? 'block' : 'none'),
          )}
          name="content"
          defaultValue={contentRef.current}
          onChange={(e) => (contentRef.current = e.target.value)}
        />
        <div style={{ display: isPreview ? 'block' : 'none' }}>
          <Content key={`${isPreview}`} source={contentRef.current} />
        </div>
      </div>
      <button type="submit">완료</button>
      <div {...stylex.props(styles.header)}>
        <button onClick={() => setIsPreview((prev) => !prev)} type="button">
          미리보기
        </button>
        <div>
          <span>title</span>
          <input type="text" name="title" defaultValue={title} />
        </div>
        <div>
          <span>spoiler</span>
          <input type="text" name="spoiler" defaultValue={spoiler} />
        </div>
      </div>
    </form>
  );
}

const styles = stylex.create({
  header: {
    position: 'fixed',
    width: '100%',
    top: '60px',
    height: '100px',
    backgroundColor: 'white',
  },
  content: {
    marginTop: '100px',
  },
  contentTextarea: (visible: string) => ({
    display: visible,
    width: '100%',
    minHeight: '300px',
  }),
});
