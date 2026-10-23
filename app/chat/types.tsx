import { UIMessage } from "ai";
import { EnumValues } from "zod/v3";

export type ChatInputProps = {
  sendMessage: (text: string) => void;
  disabled?: boolean;
};

export type ChatMessageProps = {
    messages: UIMessage<unknown>[]
}

export type SaveChatButtonProps = {
  messages: { 
    role: string; 
    content: string 
  }[]
}

export type SendMessageButtonProps = {
  disabled: boolean
}