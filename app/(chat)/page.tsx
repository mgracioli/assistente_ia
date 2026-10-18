// app/page.tsx
'use client';

import { useChat } from '@ai-sdk/react';
import {ChatInput}  from './_components/ChatInput'
import {ChatMessage} from './_components/ChatMessage'

export default function Chat() {
    const { messages, sendMessage, status } = useChat(); //Hook que faz o POST

  return (
    <div className='flex flex-col w-full max-w-md py-24 mx-auto stretch'>
      <ChatMessage messages={messages} />

      <ChatInput 
        onSend={(text) => sendMessage({ text })}
        disabled={status === 'streaming'}
      >
      </ChatInput>
    </div>
  );
}