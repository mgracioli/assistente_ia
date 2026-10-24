// app/chat/page.tsx
'use client';

import { useChat } from '@ai-sdk/react';
import {ChatMessage} from './_components/chatMessage'
import { ChatInput } from './_components/chatInput';
import { SaveChatButton } from './_components/saveChatButton';
import { SendMessageButton } from './_components/sendMessageButton';
import { ChatInputProvider } from './_contexts/chatInputContext';

export default function ChatPage() {
  const { messages, sendMessage, status } = useChat(); //Hook que faz o POST em api/chat/route.ts

  // Converte UIMessage[] para o formato que a action espera
  const serializableMessages = messages
  .filter((m) => m.role === 'user' || m.role === 'assistant')
  .map((m) => ({
    role: m.role as 'user' | 'assistant',
    content: m.parts
    .filter((p) => p.type === 'text')
    .map((p) => (p as { text: string }).text)
    .join(''),
  }));

  return (
    <div className='flex flex-col max-w-[40vw] items-center py-24 mx-auto'>
      <ChatMessage messages={messages} />
  
      <div className="flex flex-col fixed bottom-0 w-full max-w-[40vw] mb-8 p-4 gap-3 box-border border border-zinc-800 focus-within:border-blue-900 rounded-[25px] bg-white dark:bg-zinc-900">
        <ChatInputProvider 
          sendMessage={(text) => sendMessage({ text })} 
          disabled={status === 'streaming'}
        >
          <ChatInput className="w-full outline-none resize-none transition-[height] duration-100" /> 

          <div className='flex justify-between'>
            <SaveChatButton messages={serializableMessages} />
          
            <SendMessageButton />
          </div>
        </ChatInputProvider>
      </div>
    </div>
  );
}