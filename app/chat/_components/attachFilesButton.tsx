// app/chat/_components/attachFilesButton.tsx
'use client';

import { useRef } from 'react';
import { useChatInput } from '../_contexts/chatInputContext';
import Image from 'next/image';

export function AttachFilesButton() {
  const { addAttachments, disabled } = useChatInput();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);

    if (files.length > 0) addAttachments(files);

    e.target.value = ''; // permite re-selecionar o mesmo arquivo
  }

  return (
    <>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
        className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 disabled:opacity-50"
        aria-label="Anexar arquivo"
      >
        <Image 
            alt='Anexar arquivo' 
            src='/icons/clip.png' 
            width={24}
            height={24}
            className="w-6 h-6"
        />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf,text/plain"
        multiple
        className="hidden"
        onChange={handleChange}
      />
    </>
  );
}