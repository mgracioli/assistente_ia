// app/_actions/usres/cadastroUserAction.tsx
'use server';

import 'server-only';
import { z } from 'zod';
import { db } from '@/app/_lib/db';
import { Auth } from '@/app/_lib/auth';
import { revalidatePath } from 'next/cache';
import { CadastroUserState } from './cadastroUserActionTypes';

const CreateUserSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100).trim(),
  email: z.email('E-mail inválido').max(200).trim().toLowerCase(),
});

export async function CadastroUserAction(prevState: CadastroUserState, formData: FormData): Promise<CadastroUserState> {
  // autenticação
  const session = await Auth();
  if (!session?.user?.id) {
    return { success: false, error: 'Sessão expirada. Faça login novamente.' };
  }

  // Rate limiting (quando tiver Upstash configurado ou banco)
  // const { success: withinLimit } = await ratelimit.limit(session.user.id);
  // if (!withinLimit) {
  //   return { success: false, error: 'Muitas requisições. Aguarde um minuto.' };
  // }

  const validation = CreateUserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  });

  if (!validation.success) {
    const tree = z.treeifyError(validation.error);
    const fieldErrors: Record<string, string[]> = {};

    for (const [field, node] of Object.entries(tree.properties ?? {})) {
      if (node?.errors?.length) fieldErrors[field] = node.errors;
    }

    return { success: false, fieldErrors };
  }

  try {
    await db.user.create({
      data: {
        name: validation.data.name,
        email: validation.data.email,
      },
    });

    revalidatePath('/users'); // atualiza a lista dee e usuários de app/users/userList.tsx

    return { success: true };
  } catch (err: any) {
    // P2002 = unique constraint violation (email duplicado)
    if (err?.code === 'P2002') {
      return {
        success: false,
        fieldErrors: { email: ['Este e-mail já está cadastrado.'] },
      };
    }

    console.error('Erro ao criar usuário:', err);

    return { success: false, error: 'Não foi possível cadastrar o usuário. Tente novamente.' };
  }
}