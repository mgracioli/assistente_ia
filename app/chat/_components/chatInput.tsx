// app/chat/_components/chatInput.tsx
'use client';

import TextareaAutosize from 'react-textarea-autosize'
import { useChatInput } from '../_contexts/chatInputContext';
import { ChatInputProps } from '../types';

export function ChatInput({className}: ChatInputProps) {
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
      className={className}
      minRows={2}
      maxRows={6} 
      value={input}
      placeholder="Digite sua mensagem..."
      onChange={(e) => setInput(e.currentTarget.value)}
      onKeyDown={handleKeyDown}
      disabled={disabled}
    />
  );
}