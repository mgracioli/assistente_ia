// app/chat/types.ts
import { UIMessage } from "ai";

export type ChatMessageProps = {
    messages: UIMessage<unknown>[]
};

export type SaveChatButtonProps = {
  messages: { 
    role: string; 
    content: string 
  }[]
};

export type LocalAttachment = {
  id: string;        // para key no React e remoção
  file: File;
  previewUrl: string; // URL.createObjectURL para imagens ('' para não-imagens)
};

export type HandleSendProps = {
  text: string; 
  attachments: LocalAttachment[]
}