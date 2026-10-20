export type ChatActionState = {
  success: boolean;
  reply?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
} | null;