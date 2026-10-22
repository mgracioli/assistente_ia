//app/chat/_components/chatInput.tsx
'use client';

import { useState } from 'react';
import { ChatInputProps } from '../types'
import { SaveChatButton } from './saveChatButton';

export function ChatInput({ sendMessage, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const inputText = input.trim();

    if (!inputText) return;

    sendMessage(inputText);
    
    setInput('');
  }

  return (
    <div className="flex flex-col fixed bottom-0 w-full max-w-md mb-8 p-4 gap-2 border border-zinc-800 rounded-3xl shadow-xl bg-white dark:bg-zinc-900">
      <form onSubmit={handleSubmit}>
        <textarea 
          className="w-full outline-none break-words resize-none"
          value={input}
          placeholder="Digite sua mensagem..."
          onChange={(e) => setInput(e.currentTarget.value)}
          disabled={disabled}
        />
      </form>

      <SaveChatButton messages={[{ role: 'teste', content: 'Exemplo de mensagem' }]} />
    </div>
  );
}