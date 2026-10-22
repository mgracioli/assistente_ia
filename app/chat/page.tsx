// app/chat/page.tsx
'use client';

import { useChat } from '@ai-sdk/react';
import {ChatMessage} from './_components/chatMessage'
import { ChatInput } from './_components/chatInput';
import { SaveChatButton } from './_components/saveChatButton';

export default function ChatPage() {
    const { messages, sendMessage, status } = useChat(); //Hook que faz o POST em api/chat/route.ts

  return (
    <div className='flex flex-col w-full max-w-md py-24 mx-auto stretch'>
      <ChatMessage messages={messages} />

      <ChatInput 
        sendMessage={(text) => sendMessage({ text })}
        disabled={status === 'streaming'}
      >
      </ChatInput>
    </div>
  );
}