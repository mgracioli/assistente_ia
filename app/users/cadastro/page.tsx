// app/users/cadastro/page.tsx
import Link from 'next/link';
import { UserCadastroForm } from '../_components/userCadastroForm';

export default function UserCadastroPage() {
  return (
    <div className="flex flex-col gap-5 max-w-xl min-w-xs mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold">Cadastrar novo usuário</h1>

      <UserCadastroForm />

      <Link    
          href={'/users'}
          aria-label="Voltar"
          className='text-blue-600'
      >
          Voltar
      </Link>
    </div>
  );
}