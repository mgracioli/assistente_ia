// app/api/chat/route.ts

import { google } from '@ai-sdk/google';
import { streamText, UIMessage, convertToModelMessages, createUIMessageStream, toUIMessageStream, createUIMessageStreamResponse } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google('models/gemini-3.8-flash'),
    system: 'Você é um assistente útil e responde em português.',
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream
    })
  });  
}