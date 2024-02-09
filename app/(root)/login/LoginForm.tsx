'use client';

import { useFormState } from 'react-dom';
import SubmitButton from './SubmitButton';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export type LoginAction = (
  prevState: { message: string; success: boolean },
  formData: FormData,
) => Promise<{ message: string; success: boolean }>;

export default function LoginForm({ action }: { action: LoginAction }) {
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
    <form action={formAction}>
      <div>
        <span>password</span>
        <input type="password" name="password" />
      </div>
      <div>{state?.message}</div>
      <SubmitButton />
    </form>
  );
}
