// app/chat/page.tsx
'use client';

import { useChat } from '@ai-sdk/react';
import {ChatMessage} from './_components/chatMessage'
import { ChatInput } from './_components/chatInput';
import { SaveChatButton } from './_components/saveChatButton';
import { SendMessageButton } from './_components/sendMessageButton';
import { ChatInputProvider } from './_contexts/chatInputContext';
import { HandleSendProps, LocalAttachment } from './types';
import { AttachFilesButton } from './_components/attachFilesButton';
import { AttachFilesPreview } from './_components/attachFilesPreview';

export default function ChatPage() {
  const { messages, sendMessage, status } = useChat(); //Hook que faz o POST em api/chat/route.ts

  async function handleSend({ text, attachments }: HandleSendProps) {
    const parts: any[] = [];

    if (text) parts.push({ type: 'text', text });

    for (const { file } of attachments) {
      if (file.type.startsWith('image/')) {
        const buffer = new Uint8Array(await file.arrayBuffer());
        parts.push({ type: 'image', image: buffer, mimeType: file.type });
      } else if (file.type === 'application/pdf') {
        const buffer = new Uint8Array(await file.arrayBuffer());
        parts.push({ type: 'file', data: buffer, mediaType: 'application/pdf' });
      } else if (file.type === 'text/plain') {
        const content = await file.text();
        parts.push({ type: 'text', text: `[Arquivo: ${file.name}]\n${content}` });
      }
    }

    sendMessage({ parts });
  }

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
          sendMessage={handleSend} 
          disabled={status === 'streaming'}          
        >
          <AttachFilesPreview />

          <ChatInput /> 

          <div className='flex justify-between'>
              <SaveChatButton messages={serializableMessages} />
              
              <div className='flex gap-3'>
                <AttachFilesButton />   

                <SendMessageButton />
              </div>
          </div>
        </ChatInputProvider>
      </div>
    </div>
  );
}