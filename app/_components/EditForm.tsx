'use client';

import { ChangeEvent, useCallback, useRef, useState } from 'react';
import stylex from '@stylexjs/stylex';
import Content from '@/app/(root)/posts/[id]/Content';
import { useFileUpload } from '@/app/_hooks/useFileUpload';

type Props = {
  handleSubmit: (formData: FormData) => Promise<void>;
  id?: string;
  title: string;
  spoiler: string;
  content: string;
};

const EditForm = ({
  handleSubmit,
  id,
  title,
  spoiler,
  content: initialContent,
}: Props) => {
  const [isPreview, setIsPreview] = useState(false);
  const [fileUploadCount, setFileUploadCount] = useState(0);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const contentRef = useRef(initialContent);

  const upload = useCallback(async (file: File) => {
    let additionContent = '![업로드중...]()';
    const originContent = contentRef.current;
    contentRef.current = originContent + additionContent;
    setIsFileUploading(true);
    setFileUploadCount((prev) => prev + 1);

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const { href } = (await res.json()) as { href?: string };

    if (href) {
      contentRef.current = originContent + `![${file.name}](${href})`;
    } else {
      contentRef.current = originContent;
    }

    setIsFileUploading(false);
    setFileUploadCount((prev) => prev + 1);
  }, []);

  const [isDragging, FileUploader] = useFileUpload(upload);

  const handleClickPreview = useCallback(
    () => setIsPreview((prev) => !prev),
    [],
  );

  const handleContentChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) =>
      (contentRef.current = e.target.value),
    [],
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files[0]) {
        upload(files[0]);
      }
    },
    [upload],
  );

  const textareaVisible = !isPreview ? 'block' : 'none';
  const textareaBorderColor = isDragging ? 'orange' : 'none';
  const contentTextareaStyle = styles.contentTextarea(
    textareaVisible,
    textareaBorderColor,
  );

  return (
    <form action={handleSubmit}>
      <input type="hidden" name="id" defaultValue={id} readOnly />

      <FileUploader>
        <div {...stylex.props(styles.content)}>
          <span>content</span>
          <textarea
            {...stylex.props(contentTextareaStyle)}
            key={fileUploadCount}
            name="content"
            defaultValue={contentRef.current}
            onChange={handleContentChange}
          />
          <div style={{ display: isPreview ? 'block' : 'none' }}>
            <Content key={`${isPreview}`} source={contentRef.current} />
          </div>
        </div>
      </FileUploader>
      <button type="submit">완료</button>

      <div {...stylex.props(styles.header)}>
        <div>
          <input
            type="file"
            onChange={handleFileChange}
            disabled={isFileUploading}
          />
        </div>
        <button onClick={handleClickPreview} type="button">
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
};

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
  contentTextarea: (visible: string, borderColor: string) => ({
    display: visible,
    width: '100%',
    minHeight: '300px',
    borderColor,
    borderWidth: '1px',
    borderStyle: 'solid',
  }),
});

export default EditForm;
