'use client';

import { useActionState } from 'react';
import { saveChatAction } from '@/app/actions/saveChat';
import { SaveChatState } from '@/app/actions/saveChatTypes';
import { SaveChatButtonProps } from '../_types/chatTypes';

const initialState: SaveChatState = { success: false };

export function SaveChatButton({ messages }: SaveChatButtonProps) {
  const [state, formAction, isPending] = useActionState(saveChatAction, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="title" value="Minha conversa" />

      <input type="hidden" name="messages" value={JSON.stringify(messages)} />

      <button type="submit" disabled={isPending}>
        {isPending ? 'Salvando...' : 'Salvar conversa'}
      </button>
      
      {state.error && <p className="text-red-500">{state.error}</p>}
      {state.success && <p className="text-green-600">Conversa salva!</p>}
    </form>
  );
}