// app/users/page.tsx
import Link from "next/link";
import { UserList } from "./_components/userList";

export default function UserPage() {
  return (
    <div className='flex flex-col gap-5 w-full max-w-md py-8 mx-auto stretch'>
      <h1 className='text-2xl font-bold mb-4'>Página de Usuários</h1>

      <UserList />

      <Link   
          href={'/users/cadastro'}
          aria-label="Cadastrar usuário"
          className='text-blue-600'
      >
          Cadastrar usuário
      </Link>
    </div>
  );
}