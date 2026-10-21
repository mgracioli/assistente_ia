// app/users/user-list.tsx
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { fetchUsersProps, UsersPage } from './types';

async function fetchUsers({ pageParam }: fetchUsersProps): Promise<UsersPage> {
  const url = pageParam ? `/api/users?cursor=${pageParam}` : '/api/users';
  const res = await fetch(url); //trocar por db????

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

  // Achata todas as páginas em um único array de usuários
  const allUsers = data.pages.flatMap((page) => page.users);

  return (
    <div>
      <ul>
        {allUsers.map((user) => (
          <li key={user.id}>
            {user.name} — {user.email}
          </li>
        ))}
      </ul>

      {/* Sentinela: quando essa div aparecer na tela, carrega mais usuários */}
      <div ref={loadMoreRef} style={{ height: 20 }} />

      {isFetchingNextPage && <p>Carregando mais...</p>}
      {!hasNextPage && <p>Todos os usuários foram carregados.</p>}
    </div>
  );
}