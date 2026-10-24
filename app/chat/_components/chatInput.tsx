// app/chat/_components/chatInput.tsx
'use client';

import TextareaAutosize from 'react-textarea-autosize'
import { useChatInput } from '../_contexts/chatInputContext';

export function ChatInput() {
  const { input, setInput, handleSend, disabled } = useChatInput();

  // Envia a mensagem para a rota POST 
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Enter sem Shift envia; Shift+Enter quebra linha
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();

      handleSend();
    }
  }

  return (      
    <TextareaAutosize
      className="w-full outline-none resize-none transition-[height] duration-100"
      minRows={1}
      maxRows={6} 
      value={input}
      placeholder="Digite sua mensagem..."
      onChange={(e) => setInput(e.currentTarget.value)}
      onKeyDown={handleKeyDown}
      disabled={disabled}
    />
  );
}