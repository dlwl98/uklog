'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  if (pending) {
    return <div>잠시만 기다려주세요...</div>;
  }

  return <button type="submit">확인</button>;
}
