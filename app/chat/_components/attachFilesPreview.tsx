// app/chat/_components/attachPreview.tsx
'use client';

import { useChatInput } from '../_contexts/chatInputContext';

export function AttachFilesPreview() {
  const { attachments, removeAttachment } = useChatInput();

  if (attachments.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {attachments.map((att) => (
        <div key={att.id} className="relative group">
          {att.previewUrl ? (
            <img
              src={att.previewUrl}
              alt={att.file.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
          ) : (
            <div className="w-16 h-16 flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 rounded-lg text-xs text-center p-1">
              {att.file.name.split('.').pop()?.toUpperCase()}
            </div>
          )}

          <button
            type="button"
            onClick={() => removeAttachment(att.id)}
            className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remover anexo"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}