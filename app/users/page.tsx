// app/users/page.tsx
import { UserList } from "./_components/userList";

export default function UserPage() {
  return (
    <div className='flex flex-col w-full max-w-md py-8 mx-auto stretch'>
      <h1 className='text-2xl font-bold mb-4'>Página de Usuários</h1>

      <UserList />
    </div>
  );
}