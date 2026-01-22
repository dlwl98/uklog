'use client';

import { useFormStatus } from 'react-dom';
import * as stylex from '@stylexjs/stylex';
import { button } from '@/app/(root)/global.stylex';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      {...stylex.props(button.default, styles.layout(pending ? '' : 'pointer'))}
      type="submit"
      disabled={pending}
    >
      {pending ? '로그인중...' : '로그인'}
    </button>
  );
}

const styles = stylex.create({
  layout: (cursor: string) => ({
    marginTop: '20px',
    width: '100%',
    cursor,
  }),
});
