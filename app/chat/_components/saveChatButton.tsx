// app/chat/_components/saveChatButton.tsx
'use client';

import { useActionState } from 'react';
import { saveChatAction } from '@/app/_actions/saveChatAction';
import { SaveChatState } from '@/app/_actions/saveChatActionTypes';
import { SaveChatButtonProps } from '../types';

const initialState: SaveChatState = { success: false };

export function SaveChatButton({ messages }: SaveChatButtonProps) {
  const [state, formAction, isPending] = useActionState(saveChatAction, initialState);

  return (
    <div className="flex flex-col items-left">
      <form action={formAction}>
          <input type="hidden" name="title" value="Meu chat" />
          <input type="hidden" name="messages" value={JSON.stringify(messages)} />

          <button 
            type="submit" 
            disabled={isPending} 
            className="text-sm text-gray-300 bg-zinc-900 hover:bg-zinc-800 px-3 py-2 border border-zinc-700 rounded-full"
          >
            {isPending ? 'Salvando...' : 'Salvar chat'}
          </button>
  
          {state.error && <p className="text-red-500">{state.error}</p>}
          {state.success && <p className="text-green-600">Conversa salva!</p>}    
      </form>
    </div>
  );
}