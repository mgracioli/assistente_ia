// app/chat/_contexts/chatInputContextTypes.ts
import { LocalAttachment } from "../types";

export type ChatInputContextValue = {
  input: string;
  setInput: (value: string) => void;
  attachments: LocalAttachment[];
  addAttachments: (files: File[]) => void;
  removeAttachment: (id: string) => void;
  handleSend: () => void;
  disabled: boolean;
};

export type ChatInputProviderProps = {
  children: React.ReactNode;
  sendMessage: (payload: { text: string; attachments: LocalAttachment[] }) => void | Promise<void>;
  disabled: boolean;
};