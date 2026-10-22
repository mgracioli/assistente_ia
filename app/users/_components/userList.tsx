// app/users/user-list.tsx
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchUsersProps, UsersPage } from '../types';
import InfiniteScroll from 'react-infinite-scroll-component';

async function fetchUsers({ pageParam }: fetchUsersProps): Promise<UsersPage> {
  const url = pageParam ? `/api/users?cursor=${pageParam}` : '/api/users';
  const res = await fetch(url); // não trocar por db, db só roda no servidor, o fetch roda no cliente

  if (!res.ok) throw new Error('Falha ao buscar usuários');

  return res.json();
}

export function UserList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        initialPageParam: null, // primeira página não tem cursor
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      });

  if (status === 'pending') return <p>Carregando usuários...</p>;
  if (status === 'error') return <p>Erro: {error.message}</p>;

  const allUsers = data.pages.flatMap((page) => page.users);   // Agrupa todas as páginas/todos os usuários em um único array
      console.log('usersss', allUsers)
  return (
    <InfiniteScroll
      dataLength={allUsers.length}  // Obrigatório: total de itens já renderizados; dataLength precisa ser o número total de itens acumulados (o tamanho de allUsers), não o tamanho da última página. A biblioteca usa esse valor para saber quando fazer a próxima chamada de next. Se você passar o tamanho de apenas uma página, ela pode disparar next repetidamente ou nunca mais disparar depois da primeira vez
      next={() => fetchNextPage()}  // Obrigatório: função que busca a próxima página
      hasMore={!!hasNextPage}       // Obrigatório: controla se deve continuar tentando
      loader={isFetchingNextPage ? <p>Carregando mais...</p> : null}
      endMessage={<p>Todos os usuários foram carregados.</p>}
      className="max-h-[150px] overflow-y-auto border rounded"
    >
      <ul>
        {allUsers.map((user) => (
          <li key={user.id}>
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  );
}