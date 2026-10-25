// app/_actions/usres/cadastroUserActionTypes.tsx
export type CadastroUserState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};