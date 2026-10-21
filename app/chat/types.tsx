import { UIMessage } from "ai";

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
