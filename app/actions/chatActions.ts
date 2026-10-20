// app/actions/chat.ts
'use server';

import 'server-only';
import { z } from 'zod';
import { Auth } from '../lib/auth';
// import { Ratelimit } from '@upstash/ratelimit'; 
// import { Redis } from '@upstash/redis';
import { ChatActionState } from './chatActionsTypes';

const ChatInputSchema = z.object({
  message: z.string().min(1).max(2000).trim(),
});

// const ratelimit = new Ratelimit({
//   redis: Redis.fromEnv(),
//   limiter: Ratelimit.slidingWindow(10, '1 m'),
//   prefix: 'ai-chat',
// });

/* Faz a validação dos campos do formulário no servidor, usando Zod. 
  Se houver algum erro, ele será retornado para o cliente e exibido no 
  componente ChatInput. */
export async function sendMessageAction(
  prevState: ChatActionState,
  formData: FormData
): Promise<ChatActionState> {
  const session = await Auth();

  if (!session?.user?.id) {
    return { success: false, error: 'Não autorizado' };
  }

  const validation = ChatInputSchema.safeParse({
    message: formData.get('message'),
  });

  if (!validation.success) {
    const tree = z.treeifyError(validation.error) // treeifyError para schemas mais complexos, como objetos aninhados. Ele cria uma árvore aninhada de erros.
    const fieldErrors: Record<string, string[]> = {}; // Converte a árvore aninhada em Record<string, string[]> (chave: string e valor: array de strings)

    for (const [field, node] of Object.entries(tree.properties ?? {})) {
      if (node?.errors && node.errors.length > 0) {
        fieldErrors[field] = node.errors;
      }
    }

    return {
      success: false,
      fieldErrors
    };
  }

  // const { success: withinLimit } = await ratelimit.limit(session.user.id);

  // if (!withinLimit) {
  //   return { 
  //     success: false, 
  //     error: 'Muitas requisições. Aguarde um minuto.' 
  //   };
  // }

  // Aqui entraria a chamada real ao Gemini
  const reply = `Simulação: "${validation.data.message}"`;

  return { 
    success: true, 
    reply 
  };
}