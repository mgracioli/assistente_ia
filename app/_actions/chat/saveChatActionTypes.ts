// app/_actions/chat/saveChatActionTypes.ts
export type SaveChatState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  conversationId?: string;
};