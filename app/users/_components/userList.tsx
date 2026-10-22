// app/users/user-list.tsx
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { FetchUsersProps, UsersPage } from '../types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';

async function fetchUsers({ pageParam, search }: FetchUsersProps): Promise<UsersPage> {
    const params = new URLSearchParams(); // cria parâmetros para a requisição
    if (pageParam) params.set('cursor', pageParam);
    if (search.trim()) params.set('search', search.trim());

    const res = await fetch(`/api/users?${params.toString()}`); // não trocar fetch por db, db só roda no servidor, o fetch roda no cliente
    if (!res.ok) throw new Error('Falha ao buscar usuários');

    return res.json();
}

export function UserList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);     // Debounce: só atualiza o termo de busca depois de 300ms sem digitar para evitar muitas requisições ao servidor enquanto o usuário digita
        }, 300);

        return () => clearTimeout(timer); // função de limpeza que cancela o timer se o usuário digitar antes do tempo acabar
    }, [searchTerm]);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        error,
    } = useInfiniteQuery({
            queryKey: ['users', debouncedSearch], // adiciona debouncedSearch como termo de busca para que o React Query saiba que precisa refazer a requisição quando o termo mudar
            queryFn: ({ pageParam }: { pageParam: string | null }) => fetchUsers({ pageParam, search: debouncedSearch }),
            initialPageParam: null, // primeira página não tem cursor
            getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
        });  

    if (status === 'pending') return <p>Carregando usuários...</p>;
    if (status === 'error') return <p>Erro: {error.message}</p>;

    const allUsers = data.pages.flatMap((page) => page.users);   // Agrupa todas as páginas/todos os usuários em um único array
    
    return (
        <div>
            <input
                type="text"
                placeholder="Buscar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 w-full border rounded"
            />

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
        </div>
    );
}