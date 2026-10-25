// app/(app)/users/_components/UserForm.tsx
'use client';

import { useActionState } from 'react';
import { CadastroUserAction } from '@/app/_actions/users/cadastroUserAction';
import { CadastroUserState } from '@/app/_actions/users/cadastroUserActionTypes';

const initialState: CadastroUserState = { success: false };

export function UserCadastroForm() {
  const [state, formAction, isPending] = useActionState(CadastroUserAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-transparent"
        />
        
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-transparent"
        />
        
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
      >
        {isPending ? 'Cadastrando...' : 'Cadastrar usuário'}
      </button>

        {state.fieldErrors?.name && <p className="text-red-500 text-sm mt-1">{state.fieldErrors.name[0]}</p>}
        {state.fieldErrors?.email && <p className="text-red-500 text-sm mt-1">{state.fieldErrors.email[0]}</p>}
        
        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
        {state.success && <p className="text-green-600 text-sm">Usuário cadastrado com sucesso!</p>}
    </form>
  );
}