'use client';

import { useRef, useState } from 'react';

interface Props {
  onFileChange: (file: File | null) => void;
  disabled?: boolean;
}

const MAX_MB = 500;

function isVideoFile(f: File): boolean {
  if (f.type.startsWith('video/')) return true;
  return /\.(mp4|mov|avi)$/i.test(f.name);
}

export function UploadDropzone({ onFileChange, disabled = false }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [typeError, setTypeError] = useState<string | null>(null);

  function handleFile(f: File) {
    setTypeError(null);
    if (f.size > MAX_MB * 1024 * 1024) {
      setTypeError(`File too large — max ${MAX_MB} MB`);
      return;
    }
    if (!isVideoFile(f)) {
      setTypeError('Please upload an MP4, MOV, or AVI file');
      return;
    }
    setFile(f);
    onFileChange(f);
  }

  function clear(e: React.MouseEvent) {
    e.stopPropagation();
    setFile(null);
    setTypeError(null);
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = '';
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current++;
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) setIsDragging(false);
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFile(selected);
  };

  const zoneClass = [
    'relative flex flex-col items-center justify-center w-full rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors',
    disabled
      ? 'border-zinc-200 bg-zinc-50 cursor-not-allowed opacity-60'
      : isDragging
      ? 'border-orange-400 bg-orange-50 cursor-copy'
      : file
      ? 'border-zinc-300 bg-white cursor-default'
      : 'border-zinc-300 bg-white hover:border-zinc-400 hover:bg-zinc-50 cursor-pointer',
  ].join(' ');

  return (
    <div
      className={zoneClass}
      onClick={() => !disabled && !file && inputRef.current?.click()}
      onDragEnter={disabled ? undefined : handleDragEnter}
      onDragLeave={disabled ? undefined : handleDragLeave}
      onDragOver={disabled ? undefined : handleDragOver}
      onDrop={disabled ? undefined : handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleInputChange}
        disabled={disabled}
      />

      {file ? (
        <div className="flex items-center gap-3">
          <svg
            className="h-5 w-5 shrink-0 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="max-w-xs truncate text-sm font-medium text-zinc-800">{file.name}</span>
          <span className="shrink-0 text-xs text-zinc-400">
            ({(file.size / 1024 / 1024).toFixed(1)} MB)
          </span>
          <button
            onClick={clear}
            className="ml-1 text-zinc-400 transition-colors hover:text-zinc-700"
            aria-label="Remove file"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <>
          <svg
            className="mb-3 h-8 w-8 text-zinc-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <p className="text-sm font-medium text-zinc-700">
            {isDragging ? 'Drop your video here' : 'Drag footage here or click to browse'}
          </p>
          <p className="mt-1 text-xs text-zinc-400">MP4 · MOV · AVI — up to {MAX_MB} MB</p>
        </>
      )}

      {typeError && <p className="mt-3 text-xs text-red-600">{typeError}</p>}
    </div>
  );
}
