'use client';

import { useActionState } from 'react';
import { sendMessageAction } from '@/app/actions/chatActions';
import { ChatActionState } from '@/app/actions/chatActionsTypes';

export function ChatInput({ disabled }: { disabled?: boolean }) {
  const [state, formAction, isPending] = useActionState<ChatActionState, FormData>(
    sendMessageAction,
    null
  );

  return (
    <form
      action={formAction}
      className="fixed bottom-0 w-full max-w-md p-2 mb-8 border rounded shadow-xl bg-white dark:bg-zinc-900"
    >
      <input
        name="message"
        className="w-full p-2 outline-none"
        placeholder="Digite sua mensagem..."
        disabled={disabled || isPending}
        autoComplete="off"
      />

      {/* Erros de validação do Zod - aqui ele mostra a mensagem de erro gerada pelo servidor na Action */}
      {state?.fieldErrors?.message && (
        <p className="text-red-500 text-sm mt-1">
          {state.fieldErrors.message[0]}
        </p>
      )}

      {/* Erros gerais (auth, rate limit) */}
      {state?.error && (
        <p className="text-red-500 text-sm mt-1">
          {state.error}
        </p>
      )}

      {/* Feedback de envio */}
      {isPending && (
        <p className="text-gray-500 text-sm mt-1">
          Enviando...
        </p>
      )}
    </form>
  );
}