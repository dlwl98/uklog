import { useContext } from 'react';
import { ToastContext } from '.';

export default function useToast() {
  const value = useContext(ToastContext);
  if (value === null) {
    throw Error('Toaster not found');
  }
  return value;
}
