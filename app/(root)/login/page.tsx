import stylex from '@stylexjs/stylex';
import LoginForm from './LoginForm';
import { login } from './loginAction';
import { flex } from '@/app/global.stylex';

export default async function Page() {
  return (
    <div {...stylex.props(flex.column, flex.center, styles.layout)}>
      <div {...stylex.props(flex.column, styles.formHeader)}>
        <h1>관리자 로그인</h1>
        <span {...stylex.props(styles.notice)}>
          관리자만 글을 작성하거나 수정할 수 있습니다
        </span>
        <LoginForm action={login} />
      </div>
    </div>
  );
}

const styles = stylex.create({
  layout: {
    marginTop: '100px',
  },
  formHeader: {
    gap: '5px',
  },
  notice: {
    fontSize: '0.9rem',
    color: 'gray',
  },
});
