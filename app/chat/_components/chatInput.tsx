'use client';

import { useState } from 'react';
import { ChatInputProps } from '../_types/chatTypes'

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
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 w-full max-w-md p-2 mb-8 border rounded shadow-xl bg-white dark:bg-zinc-900"
    >
      <input
        className="w-full p-2 outline-none"
        value={input}
        placeholder="Digite sua mensagem..."
        onChange={(e) => setInput(e.currentTarget.value)}
        disabled={disabled}
      />
    </form>
  );
}