'use client';

import { ChangeEvent, useCallback, useRef, useState } from 'react';
import stylex from '@stylexjs/stylex';
import Content from '@/app/(root)/posts/[id]/(post)/Content';
import useDragDrop from '@/app/_hooks/useDragDrop';

type Props = {
  handleSubmit: (formData: FormData) => Promise<void>;
  id?: string;
  isPrivate: boolean;
  title: string;
  spoiler: string;
  content: string;
  createdAt?: string;
};

const EditForm = ({
  handleSubmit,
  id,
  title,
  spoiler,
  content: initialContent,
  isPrivate: initialIsPrivate,
  createdAt,
}: Props) => {
  const [isPreview, setIsPreview] = useState(false);
  const [fileUploadCount, setFileUploadCount] = useState(0);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [isPrivateChecked, setIsPrivateChecked] = useState(initialIsPrivate);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef(initialContent);

  const upload = useCallback(async (file: File) => {
    let additionContent = '![업로드중...]()';
    const originContent = contentRef.current;
    contentRef.current = originContent + additionContent;
    setIsFileUploading(true);
    setFileUploadCount((prev) => prev + 1);

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/admin/upload', {
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

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | DragEvent) => {
      let file: File | undefined;
      if ('dataTransfer' in e) {
        file = e.dataTransfer?.files[0];
      } else {
        file = e.target.files?.[0];
      }
      if (file) {
        upload(file);
      }
    },
    [upload],
  );

  const [isDragging, dragRef] = useDragDrop<HTMLDivElement>(handleFileChange);

  const handleClickPreview = useCallback(
    () => setIsPreview((prev) => !prev),
    [],
  );

  const handleContentChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) =>
      (contentRef.current = e.target.value),
    [],
  );

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <form {...stylex.props(styles.form)} action={handleSubmit}>
      <input type="hidden" name="id" defaultValue={id} readOnly />

      <div {...stylex.props(styles.fieldGroup)}>
        <label {...stylex.props(styles.label)}>제목</label>
        <input
          {...stylex.props(styles.input, styles.titleInput)}
          type="text"
          name="title"
          defaultValue={title}
          placeholder="글 제목을 입력하세요"
        />
      </div>

      <div {...stylex.props(styles.fieldGroup)}>
        <label {...stylex.props(styles.label)}>요약</label>
        <input
          {...stylex.props(styles.input)}
          type="text"
          name="spoiler"
          defaultValue={spoiler}
          placeholder="글 목록에 표시될 요약을 입력하세요"
        />
      </div>

      <div {...stylex.props(styles.toggleGroup)}>
        <label {...stylex.props(styles.toggleLabel)}>
          <input
            {...stylex.props(styles.checkbox)}
            type="checkbox"
            name="isPrivate"
            checked={isPrivateChecked}
            onChange={(e) => setIsPrivateChecked(e.target.checked)}
          />
          <span
            {...stylex.props(
              styles.toggleSwitch,
              isPrivateChecked && styles.toggleSwitchChecked,
            )}
          />
          <span {...stylex.props(styles.toggleText)}>비공개</span>
        </label>
      </div>

      <div {...stylex.props(styles.fieldGroup)}>
        <label {...stylex.props(styles.label)}>작성 시간</label>
        <input
          {...stylex.props(styles.input)}
          type="datetime-local"
          name="createdAt"
          defaultValue={createdAt}
        />
      </div>

      <div {...stylex.props(styles.fieldGroup, styles.contentGroup)}>
        <div {...stylex.props(styles.contentHeader)}>
          <label {...stylex.props(styles.label)}>내용</label>
          <div {...stylex.props(styles.contentActions)}>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              disabled={isFileUploading}
              style={{ display: 'none' }}
            />
            <button
              {...stylex.props(styles.actionButton)}
              type="button"
              onClick={handleUploadClick}
              disabled={isFileUploading}
            >
              {isFileUploading ? '업로드 중...' : '이미지 업로드'}
            </button>
            <button
              {...stylex.props(
                styles.actionButton,
                isPreview && styles.actionButtonActive,
              )}
              type="button"
              onClick={handleClickPreview}
            >
              미리보기
            </button>
          </div>
        </div>
        <div
          ref={dragRef}
          {...stylex.props(
            styles.contentWrapper,
            isDragging && styles.contentWrapperDragging,
          )}
        >
          <textarea
            {...stylex.props(styles.textarea)}
            style={{ display: isPreview ? 'none' : 'block' }}
            key={fileUploadCount}
            name="content"
            defaultValue={contentRef.current}
            onChange={handleContentChange}
            placeholder="마크다운으로 내용을 작성하세요. 이미지는 드래그 앤 드롭으로 업로드할 수 있습니다."
          />
          {isPreview && (
            <div {...stylex.props(styles.previewArea)}>
              <Content key={`${isPreview}`} source={contentRef.current} />
            </div>
          )}
        </div>
      </div>

      <button {...stylex.props(styles.submitButton)} type="submit">
        게시하기
      </button>
    </form>
  );
};

const styles = stylex.create({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '24px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#374151',
  },
  input: {
    padding: '12px 16px',
    fontSize: '1rem',
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: {
      default: '#e5e7eb',
      ':focus': '#6366f1',
    },
    outline: 'none',
    transition: 'border-color 0.2s ease',
    backgroundColor: '#fafafa',
  },
  titleInput: {
    fontSize: '1.25rem',
    fontWeight: 500,
  },
  toggleGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  toggleLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
  },
  checkbox: {
    display: 'none',
  },
  toggleSwitch: {
    position: 'relative',
    width: '48px',
    height: '24px',
    backgroundColor: '#e5e7eb',
    borderRadius: '12px',
    transition: 'background-color 0.2s ease',
    '::before': {
      content: '""',
      position: 'absolute',
      top: '2px',
      left: '2px',
      width: '20px',
      height: '20px',
      backgroundColor: 'white',
      borderRadius: '50%',
      transition: 'transform 0.2s ease',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    },
  },
  toggleSwitchChecked: {
    backgroundColor: '#6366f1',
    '::before': {
      content: '""',
      position: 'absolute',
      top: '2px',
      left: '2px',
      width: '20px',
      height: '20px',
      backgroundColor: 'white',
      borderRadius: '50%',
      transition: 'transform 0.2s ease',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      transform: 'translateX(24px)',
    },
  },
  toggleText: {
    fontSize: '0.9rem',
    color: '#6b7280',
  },
  contentGroup: {
    flexGrow: 1,
  },
  contentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentActions: {
    display: 'flex',
    gap: '8px',
  },
  actionButton: {
    padding: '8px 16px',
    fontSize: '0.85rem',
    fontWeight: 500,
    borderRadius: '6px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#e5e7eb',
    backgroundColor: {
      default: 'white',
      ':hover': '#f9fafb',
    },
    color: '#374151',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  actionButtonActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
    color: 'white',
  },
  contentWrapper: {
    borderRadius: '8px',
    borderWidth: '2px',
    borderStyle: 'dashed',
    borderColor: '#e5e7eb',
    transition: 'border-color 0.2s ease',
    minHeight: '400px',
  },
  contentWrapperDragging: {
    borderColor: '#f97316',
    backgroundColor: '#fff7ed',
  },
  textarea: {
    width: '100%',
    minHeight: '400px',
    padding: '16px',
    fontSize: '1rem',
    lineHeight: 1.6,
    borderRadius: '8px',
    borderWidth: 0,
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    backgroundColor: 'transparent',
  },
  previewArea: {
    padding: '16px',
    minHeight: '400px',
  },
  submitButton: {
    padding: '16px 32px',
    fontSize: '1.1rem',
    fontWeight: 600,
    borderRadius: '8px',
    borderWidth: 0,
    backgroundColor: {
      default: '#F3B95F',
      ':hover': '#E5A84D',
    },
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    alignSelf: 'flex-end',
  },
});

export default EditForm;
