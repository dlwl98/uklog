'use client';

import { useState } from 'react';
import stylex from '@stylexjs/stylex';

interface Props {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function ProfileAccordion({
  title,
  children,
  defaultOpen = false,
}: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div {...stylex.props(styles.container)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        {...stylex.props(styles.button)}
      >
        <span {...stylex.props(styles.title)}>{title}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...stylex.props(styles.icon, isOpen && styles.iconOpen)}
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        {...stylex.props(
          styles.contentWrapper,
          isOpen ? styles.contentOpen : styles.contentClosed,
        )}
      >
        <div {...stylex.props(styles.contentInner)}>{children}</div>
      </div>
    </div>
  );
}

const styles = stylex.create({
  container: {
    width: '100%',
    marginBottom: '32px',
    borderRadius: '12px',
    borderWidth: '1px',
    borderStyle: 'solid',
    backgroundColor: 'white',
    overflow: 'hidden',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    borderColor: {
      default: '#e5e7eb',
      ':hover': '#F3B95F',
    },
    boxShadow: {
      default: 'none',
      ':hover': '0 4px 12px rgba(243, 185, 95, 0.1)',
    },
  },
  button: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    backgroundColor: 'white',
    borderWidth: '0px',
    borderStyle: 'none',
    cursor: 'pointer',
    outlineStyle: 'none',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#374151',
    textAlign: 'left',
  },
  icon: {
    color: '#9ca3af',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  iconOpen: {
    transform: 'rotate(180deg)',
    color: '#F3B95F',
  },
  contentWrapper: {
    transition:
      'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
    overflow: 'hidden',
  },
  contentOpen: {
    maxHeight: '2000px',
    opacity: 1,
  },
  contentClosed: {
    maxHeight: '0',
    opacity: 0,
  },
  contentInner: {
    padding: '0 24px 24px 24px',
    color: '#4b5563',
    lineHeight: 1.7,
    fontSize: '1rem',
  },
});
