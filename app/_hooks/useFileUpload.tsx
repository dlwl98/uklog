'use client';

import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  PropsWithChildren,
  useMemo,
} from 'react';

export function useFileUpload(onFileDrop: (file: File) => void) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragRef = useRef<HTMLDivElement | null>(null);

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer?.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      const file = e.dataTransfer?.files[0];
      if (file) {
        onFileDrop(file);
      }
      setIsDragging(false);
    },
    [onFileDrop],
  );

  const addDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener('dragenter', handleDragIn);
      dragRef.current.addEventListener('dragleave', handleDragOut);
      dragRef.current.addEventListener('dragover', handleDragOver);
      dragRef.current.addEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const removeDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener('dragenter', handleDragIn);
      dragRef.current.removeEventListener('dragleave', handleDragOut);
      dragRef.current.removeEventListener('dragover', handleDragOver);
      dragRef.current.removeEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    addDragEvents();

    return () => removeDragEvents();
  }, [addDragEvents, removeDragEvents]);

  const FileUploader = useCallback(
    ({ children }: PropsWithChildren) => <div ref={dragRef}>{children}</div>,
    [],
  );

  return useMemo(
    () => [isDragging, FileUploader] as const,
    [isDragging, FileUploader],
  );
}
