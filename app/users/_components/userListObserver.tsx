// Esse componente não está sendo utilizado pois foi trocado pelo componente "userList", esse daqui foi feito para testar o uso do IntersectionObserver.
// O "userList.tsx" usa um componente que substitui o observer e faz a mesma coisa, além de ser mais completo, então esse componente foi deixado apenas como referência de estudo.


// app/users/user-list.tsx
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { fetchUsersProps, UsersPage } from '../types';

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

  // referência para o elemento "sentinela" no fim da lista para saber quando carregar mais usuários
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Se a sentinela está visível, há mais páginas e não está carregando
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const current = loadMoreRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === 'pending') return <p>Carregando usuários...</p>;
  if (status === 'error') return <p>Erro: {error.message}</p>;

  // Agrupa todas as páginas/todos os usuários em um único array de usuários
  const allUsers = data.pages.flatMap((page) => page.users);
  console.log('users', allUsers)

  return (
    <div className="max-h-[600px] overflow-y-auto border rounded">
      <ul>
        {allUsers.map((user) => (
          <li key={user.id}>
            {user.id} - {user.name} — {user.email}
          </li>
        ))}
      </ul>

      {/* Sentinela: quando essa div aparecer na tela, carrega mais usuários - quem faz isso é o observer, ele identifica a interseção da sentinela na viewport ancestral a ela */}
      <div ref={loadMoreRef} style={{ height: 20 }} />

      {isFetchingNextPage && <p>Carregando mais...</p>}
      {!hasNextPage && <p>Todos os usuários foram carregados.</p>}
    </div>
  );
}