// app/users/cadastro/page.tsx
import { UserCadastroForm } from '../_components/userCadastroForm';

export default function UserCadastroPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Cadastrar novo usuário</h1>

      <UserCadastroForm />
    </div>
  );
}