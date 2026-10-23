//app/chat/_components/chatInput.tsx
'use client';

import { useState } from 'react';
import { ChatInputProps } from '../types'
import { SaveChatButton } from './saveChatButton';
import { SendMessageButton } from './sendMessageButton';
import TextareaAutosize from 'react-textarea-autosize'

export function ChatInput({ sendMessage, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  function handleSend() {
    const inputText = input.trim();
    if (!inputText || disabled) return;

    sendMessage(inputText)

    setInput('');
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Enter sem Shift envia; Shift+Enter quebra linha
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    handleSend();
  }

  return (
    <form 
      onSubmit={handleSubmit}
      //className="flex flex-col fixed bottom-0 w-full max-w-[50vw] mb-8 p-4 gap-5 box-border border border-zinc-800 focus-within:border-blue-900 rounded-[25px] bg-white dark:bg-zinc-900"
    >
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
    </form>
  );
}