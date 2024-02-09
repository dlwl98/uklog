import Link from 'next/link';
import LoginForm from './LoginForm';
import { login } from './loginAction';

export default async function Page() {
  return (
    <div>
      <Link href="/">리스트로</Link>
      <div>관리자 로그인</div>
      <LoginForm action={login} />
    </div>
  );
}
