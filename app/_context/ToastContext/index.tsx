'use client';

import './keyframes.css';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

export type Toast = {
  content: React.ReactNode;
  style?: React.CSSProperties;
};

export type ToastMap = Map<string, Toast>;

type ToastOption = { style?: React.CSSProperties; duration?: number };
type ToastFn = (content: React.ReactNode, option?: ToastOption) => string;
type ToastContextValue = {
  toast: ToastFn;
  unmount: (id: string) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);

type Props = PropsWithChildren<{
  containerStyle?: React.CSSProperties;
  toastStyle?: React.CSSProperties;
  defaultDuration?: number;
}>;

export default function Toaster({
  children,
  defaultDuration = 2000,
  containerStyle: _containerStyle = {},
  toastStyle: _toastStyle = {},
}: Props) {
  const [toastMap, setToasts] = useState<ToastMap>(new Map());
  const idRef = useRef(0);

  const unmount = useCallback(
    (id: string) => {
      setToasts((prev) => {
        const cloned = new Map(prev);
        cloned.delete(id);
        return cloned;
      });
    },
    [setToasts],
  );

  const toast: ToastFn = useCallback(
    (content: React.ReactNode, { style, duration = defaultDuration } = {}) => {
      idRef.current += 1;
      const id = idRef.current.toString();
      setToasts((prev) => {
        const cloned = new Map(prev);
        cloned.set(id, { style, content });
        return cloned;
      });
      setTimeout(() => unmount(id), duration);
      return id;
    },
    [setToasts, unmount, defaultDuration],
  );

  const value = useMemo(() => ({ toast, unmount }), [toast, unmount]);
  const containerStyle = { ...defultContainerStyle, ..._containerStyle };
  const toastStyle = { ...defaultToastStyle, ..._toastStyle };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div style={containerStyle}>
        {[...toastMap.entries()].map(([id, { style, content }]) => (
          <div key={id} style={{ ...toastStyle, ...style }}>
            {content}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

const defultContainerStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: '50vw',
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column-reverse',
  padding: '5px',
  gap: '5px',
};

const defaultToastStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '5px',
  borderRadius: '5px',
  boxShadow: '0 2px 5px gray',
  display: 'flex',
  transform: 'translate(-50%)',
  animation: 'fadeInUp 0.3s ease-in-out',
};
