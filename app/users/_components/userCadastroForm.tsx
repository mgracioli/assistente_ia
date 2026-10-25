// app/(app)/users/_components/UserCadastroForm.tsx
'use client';

import { useActionState, useEffect } from 'react';
import { CadastroUserAction } from '@/app/users/_actions/cadastroUserAction';
import { CadastroUserState } from '@/app/users/_actions/cadastroUserActionTypes';
import { toast } from 'sonner';
import Link from 'next/link';

const initialState: CadastroUserState = { success: false }; // na montagem do componente, o useEffect vai rodar mas, nesse caso, como ele inicia como "false", não vai disparar nenhum toast

export function UserCadastroForm() {
    const [state, formAction, isPending] = useActionState(CadastroUserAction, initialState); 

    // useEffect com [state]: o effect roda apenas quando state muda. Como o useActionState retorna um novo objeto state a cada submissão, o effect dispara uma vez por submissão, não a cada render. Se deixar para disparar o toast dentro do jsx, eles serão disparados a cada render (cada vez que o isPending muda, um render é disparado)
    useEffect(() => {
        if (state.success) toast.success('Usuário cadastrado com sucesso!');
        if (state.error) toast.error(state.error);
    }, [state]);

    return (
        <form 
            action={formAction} 
            className="flex flex-col gap-5 w-full"
        >
            <div>
                <label 
                    htmlFor="name" 
                    className="block text-sm font-medium mb-1"
                >
                    Nome
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-transparent"
                />

                {state.fieldErrors?.name && (
                    <p className="text-red-500 text-sm mt-1">{state.fieldErrors.name[0]}</p>
                )}
            </div>

            <div>
                <label 
                    htmlFor="email" 
                    className="block text-sm font-medium mb-1"
                >
                    E-mail
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-transparent"
                />

                {state.fieldErrors?.email && (
                    <p className="text-red-500 text-sm mt-1">{state.fieldErrors.email[0]}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
                Cadastrar
            </button>
        </form>
    );
}