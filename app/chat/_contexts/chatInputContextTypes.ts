// app/chat/_contexts/chatInputContextTypes.ts
type ChatInputContextValue = {
  input: string;
  setInput: (value: string) => void;
  handleSend: () => void;
  disabled: boolean;
};

type ChatInputProviderProps = {
  children: React.ReactNode;
  sendMessage: (text: string) => void;
  disabled: boolean;
};