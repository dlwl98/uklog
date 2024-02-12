'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useRouter, useSearchParams } from 'next/navigation';
import stylex from '@stylexjs/stylex';
import SubmitButton from './SubmitButton';
import { flex } from '@/app/global.stylex';

export type LoginAction = (
  prevState: { message: string; success: boolean },
  formData: FormData,
) => Promise<{ message: string; success: boolean }>;

const LoginForm = ({ action }: { action: LoginAction }) => {
  const [state, formAction] = useFormState(action, {
    message: '',
    success: false,
  });
  const router = useRouter();
  const query = useSearchParams();

  useEffect(() => {
    if (state.success) {
      router.push(query.get('redirect') ?? '/');
    }
  }, [state.success, router, query]);

  return (
    <form {...stylex.props(styles.layout)} action={formAction}>
      <div {...stylex.props(flex.column, styles.inputBox)}>
        <input
          {...stylex.props(styles.input)}
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
        />
        <div {...stylex.props(styles.message)}>{state?.message}</div>
      </div>
      <SubmitButton />
    </form>
  );
};

const styles = stylex.create({
  layout: {
    marginTop: '10px',
  },
  inputBox: {
    gap: '2px',
    width: '300px',
  },
  input: {
    outline: 'none',
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: '2px',
    borderStyle: 'solid',
    borderColor: {
      default: 'lightgray',
      ':focus': 'gray',
    },
    fontSize: '1.1rem',
    padding: '4px',
  },
  message: {
    paddingLeft: '5px',
    color: 'red',
    fontWeight: 500,
    fontSize: '0.8rem',
  },
});

export default LoginForm;
