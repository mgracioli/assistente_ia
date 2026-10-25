// app/_actions/chat/saveChatAction.ts
'use server';

import 'server-only'; // garante que um módulo seja utilizado exclusivamente no lado do servidor. Se tentar importar esse módulo em um Client Component, o Next.js gera um erro durante a compilação
import { z } from 'zod';
import { Auth } from '@/app/_lib/auth';
import { db } from '@/app/_lib/db';
import { revalidatePath } from 'next/cache';
import { SaveChatState } from './saveChatActionTypes';

// schema para validação das mensagens
const messageSchema = z.object({
  role: z.enum(['user', 'assistant']), // enum restringe o valor de "role" para apenas um dos dois que estão definidos
  content: z.string().min(1).max(10000),
});

// schema para validação do chat
const saveChatSchema = z.object({
  title: z.string().min(1).max(120).trim(),
  messages: z.array(messageSchema).min(1).max(100), // limite de mensagens por conversa
});

export async function saveChatAction(prevState: SaveChatState, formData: FormData): Promise<SaveChatState> {
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

  // parse do formdata (as mensagens vêm da input do form como JSON string)
  let parsedMessages: unknown;
  
  try {
    parsedMessages = JSON.parse(formData.get('messages') as string);
  } catch {
    return { success: false, error: 'Formato de mensagens inválido.' };
  }

  // validação do zod para o schema do chat
  const validation = saveChatSchema.safeParse({
    title: formData.get('title'),
    messages: parsedMessages,
  });

  if (!validation.success) {
    const tree = z.treeifyError(validation.error);
    const fieldErrors: Record<string, string[]> = {};

    for (const [field, node] of Object.entries(tree.properties ?? {})) {
      if (node?.errors?.length) fieldErrors[field] = node.errors;
    }

    return { success: false, fieldErrors };
  }

  // persistência na tabela "chat" do banco
  try {
    const chat = await db.chat.create({
      data: {
        userId: session.user.id,
        title: validation.data.title,
        messages: {
          create: validation.data.messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        },
      },
    });

    // revalida a página de histórico para refletir a nova conversa
    revalidatePath('/historico');

    return { success: true, conversationId: chat.id };
  } catch (err) {
    console.error('Erro ao salvar conversa:', err);
    return { success: false, error: 'Não foi possível salvar a conversa. Tente novamente.' };
  }
}