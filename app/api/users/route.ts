// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/app/_lib/db'; // seu cliente Prisma

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url); // obtém os parâmetros da URL (os parâmetros ficam armazenados na propriedade "searchParams" da request.url)  
    const cursor = searchParams.get('cursor'); // obtém o id do último usuário carregado, a paginação é baseada em cursor em vez de offset/skip
    const search = searchParams.get('search');
    const limit = 5; // quantos usuários por página

    const where = search
    ? { name: { contains: search, mode: 'insensitive' as const } }
    : {};

    const users = await db.user.findMany({
    take: limit,
    where,
    // Se já houver cursor carregado, pula ele e começa a partir do próximo
    ...(cursor ? 
        {
            skip: 1,  // pula o cursor atual par ele não ser incluído na próxima página
            cursor: { id: cursor },
        }
        : {}),
    orderBy: { id: 'asc' }, // ordenação estável por causa do cursor
    select: { id: true, name: true, email: true },
    });

    // O próximo cursor é o id do último usuário da página atual, ou null se não houver mais usuários
    const nextCursor = users.length === limit ? users[users.length - 1].id : null;

    return NextResponse.json({
    users,
    nextCursor,
    });
}