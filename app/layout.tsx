import stylex from '@stylexjs/stylex';
import './globals.css';
import { LoginButton } from './_components/LoginButton';
import Link from 'next/link';
import { flex } from './global.stylex';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html {...stylex.props(styles.reset, styles.html)} lang="ko">
      <body {...stylex.props(styles.reset, flex.column, styles.body)}>
        <div {...stylex.props(flex.row, styles.header)}>
          <div {...stylex.props(flex.row, styles.headerLeftItems)}>
            <Link href="/">Posts</Link>
            <Link href="/about">About</Link>
          </div>
          <div {...stylex.props(flex.row, styles.headerRightItems)}>
            <LoginButton />
          </div>
        </div>
        <main {...stylex.props(styles.main)}>{children}</main>
        <Link href="/">
          <div {...stylex.props(flex.center, styles.footer)}>
            <div {...stylex.props(flex.row, styles.copyrights)}>
              <span>©</span>
              <span>2024 dlwl98</span>
            </div>
          </div>
        </Link>
      </body>
    </html>
  );
}

const styles = stylex.create({
  html: {
    fontFamily: 'Pretendard',
  },
  reset: {
    margin: 0,
    padding: 0,
  },
  body: {
    maxWidth: '1000px',
    minWidth: '300px',
    minHeight: '100vh',
    margin: 'auto',
    fontSize: '1rem',
  },
  header: {
    width: '100%',
    height: '60px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingBottom: '14px',
    paddingTop: '14px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'lightgray',
    borderBottomWidth: '1px',
  },
  headerLeftItems: {
    flexGrow: 1,
    gap: '30px',
    fontWeight: 600,
  },
  headerRightItems: {
    gap: '5px',
    fontSize: '0.75rem',
  },
  main: {
    flexGrow: 1,
    width: '100%',
  },
  footer: {
    width: '100%',
    padding: '10px',
  },
  copyrights: {
    fontWeight: 500,
    fontSize: '0.7rem',
    gap: '5px',
    color: 'lightgray',
  },
});
