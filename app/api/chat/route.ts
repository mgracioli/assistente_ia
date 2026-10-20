// app/api/chat/route.ts
import { google } from '@ai-sdk/google';
import { streamText, UIMessage, convertToModelMessages, tool, createUIMessageStreamResponse, toUIMessageStream } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google('models/gemini-3.8-flash'),
    system: 'Você é um assistente útil e responde em português.',
    messages: await convertToModelMessages(messages),
    tools: {
      getWeather: tool({
        description: 'Obtém a previsão do tempo para uma cidade',
        inputSchema: z.object({    // z.object vira um JSON Schema que define o formato dos argumentos que o modelo deve enviar se ele escolher usar essa ferramenta
          city: z.string().describe('Nome da cidade, ex: São Paulo'),
        }),
        execute: async ({ city }) => {
          // Simulação — em um projeto real eu chamaria uma API de clima
          const options = ['ensolarado', 'nublado', 'chuvoso', 'ventando'];
          const weather = options[Math.floor(Math.random() * options.length)];
          const temperature = `${20 + Math.floor(Math.random() * 15)}°C`

          return { city, weather, temperature};
        },
      }),
      sendMail: tool({
        description: 'Envia um e-mail',
        inputSchema: z.object({    // z.object vira um JSON Schema que define o formato dos argumentos que o modelo deve enviar se ele escolher usar essa ferramenta
          dest: z.string().describe('Nome do destinatário do e-mail, ex: João'),
          text: z.string().describe('Texto do corpo do e-mail, ex: Atenção! reunião marcada para amanhã'),
        }),
        execute: async ({ dest, text }) => {
          // Simulação — em um projeto real eu chamaria uma API de envio de e-mail
          const msgm = text;

          const result = ['sucesso', 'erro'];
          const resp = result[Math.floor(Math.random() * result.length)];
          
          return { dest, resp };
        },
      })
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream
    })
  });
}