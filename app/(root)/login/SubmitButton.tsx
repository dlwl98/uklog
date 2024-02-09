'use client';

import { useFormStatus } from 'react-dom';
import stylex from '@stylexjs/stylex';
import { button } from '@/app/global.stylex';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      {...stylex.props(button.default, styles.layout)}
      type="submit"
      disabled={pending}
    >
      로그인
    </button>
  );
}

const styles = stylex.create({
  layout: {
    marginTop: '20px',
    width: '100%',
  },
});
