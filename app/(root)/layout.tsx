import './globals.css';
import './uiw.css';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import stylex from '@stylexjs/stylex';
import { flex } from '@/app/(root)/global.stylex';
import { LoginButton } from './LoginButton';
import ScrollTop from './ScrollTop';
import { HashScroller } from './HashScroller';
import Toaster from '../_context/ToastContext';

export const metadata: Metadata = {
  title: `dlwl98 • web developer`,
  description: '프론트엔드 개발자 이진욱입니다',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html {...stylex.props(styles.reset, styles.html)} lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="180x180" />
        <link
          rel="apple-touch-icon"
          href="/apple-icon.png"
          type="image/png"
          sizes="180x180"
        />
      </head>
      <body {...stylex.props(styles.reset, flex.column, styles.body)}>
        <Toaster>
          <ScrollTop />
          <HashScroller offset={80} />
          <main {...stylex.props(styles.main)}>{children}</main>
          <div {...stylex.props(flex.center, styles.footer)}>
            <Link href="/">
              <div {...stylex.props(flex.row, styles.copyrights)}>
                <span>©</span>
                <span>2024 dlwl98</span>
              </div>
            </Link>
            <Link
              {...stylex.props(flex.center)}
              target="_blank"
              href="https://github.com/dlwl98"
            >
              <Image
                src="/images/github.svg"
                height={20}
                width={20}
                alt="github"
              />
            </Link>
          </div>
          <div {...stylex.props(flex.row, styles.header)}>
            <div {...stylex.props(flex.row, styles.headerLeftItems)}>
              <Link href="/">Posts</Link>
              <Link href="/about">About</Link>
            </div>
            <div {...stylex.props(flex.row, styles.headerRightItems)}>
              <LoginButton />
            </div>
          </div>
        </Toaster>
      </body>
    </html>
  );
}

const styles = stylex.create({
  reset: {
    margin: 0,
    padding: 0,
  },
  html: {
    scrollBehavior: 'smooth',
  },
  body: {
    minWidth: '300px',
    maxWidth: '1000px',
    minHeight: '100vh',
    margin: 'auto',
    paddingTop: '60px',
    fontSize: '1rem',
  },
  header: {
    minWidth: '300px',
    maxWidth: '1000px',
    width: '100%',
    height: '60px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingBottom: '14px',
    paddingTop: '14px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'lightgray',
    borderBottomWidth: '1px',
    backgroundColor: 'white',
    position: 'fixed',
    top: 0,
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
    height: '80px',
    padding: '10px',
    gap: '10px',
  },
  copyrights: {
    fontWeight: 500,
    fontSize: '0.7rem',
    gap: '5px',
    color: 'lightgray',
  },
});
