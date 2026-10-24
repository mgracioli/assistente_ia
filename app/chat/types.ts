// app/chat/types.ts
import { UIMessage } from "ai";

export type ChatMessageProps = {
    messages: UIMessage<unknown>[]
}

export type SaveChatButtonProps = {
  messages: { 
    role: string; 
    content: string 
  }[]
}