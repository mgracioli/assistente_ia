'use client';

import { UIMessage } from '@ai-sdk/react';

type ChatMessage = {
    messages: UIMessage<unknown>[]
}

export function ChatMessage({messages}: ChatMessage) {
      return(
        <div className="flex flex-col">
            {messages.map((message) => (
                <div key={message.id} className="whitespace-pre-wrap mb-4">

                <span className="font-bold">
                    {message.role === 'user' ? 'Você: ' : 'IA: '}
                </span>

                {message.parts.map((part, i) => {
                    if (part.type === 'text') {
                        return <span key={`${message.id}-${i}`}>{part.text}</span>;
                    }
                    return null;
                })}
                </div>
            ))}
        </div>
      )
}