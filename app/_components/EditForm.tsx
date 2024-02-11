'use client';

import { ChangeEvent, useCallback, useRef, useState } from 'react';
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
  const [fileUploadCount, setFileUploadCount] = useState(0);
  const contentRef = useRef(initialContent);
  const fileRef = useRef<File | null>(null);

  const upload = useCallback(async () => {
    if (fileRef.current === null) {
      return;
    }
    const formData = new FormData();
    formData.append('file', fileRef.current);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const { href } = (await res.json()) as { href: unknown };

    if (typeof href === 'string') {
      contentRef.current += `![image alt here](${href})`;
      setFileUploadCount((prev) => prev + 1);
    }
  }, []);

  const preview = useCallback(() => setIsPreview((prev) => !prev), []);

  const handleContentChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) =>
      (contentRef.current = e.target.value),
    [],
  );

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      fileRef.current = files[0];
    }
  }, []);

  return (
    <form action={handleSubmit}>
      <input type="hidden" name="id" defaultValue={id} readOnly />

      <div {...stylex.props(styles.content)}>
        <span>content</span>
        <textarea
          {...stylex.props(
            styles.contentTextarea(!isPreview ? 'block' : 'none'),
          )}
          key={fileUploadCount}
          name="content"
          defaultValue={contentRef.current}
          onChange={handleContentChange}
        />
        <div style={{ display: isPreview ? 'block' : 'none' }}>
          <Content key={`${isPreview}`} source={contentRef.current} />
        </div>
      </div>
      <button type="submit">완료</button>
      <div {...stylex.props(styles.header)}>
        <div>
          <input type="file" onChange={handleFileChange} />
          <button type="button" onClick={upload}>
            업로드
          </button>
        </div>
        <button onClick={preview} type="button">
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
