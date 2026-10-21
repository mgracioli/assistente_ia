import { Auth } from '@/app/_lib/auth';
import { db } from '@/app/_lib/db';
import { redirect } from 'next/navigation';

export default async function HistoricoPage() {
  const session = await Auth();
  
  if (!session?.user?.id) redirect('/login');

  const chats = await db.chat.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: 'desc' },
    include: { _count: { select: { messages: true } } },
  });

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Minhas conversas</h1>

      {chats.length === 0 && <p className="text-gray-500">Nenhuma conversa salva ainda.</p>}

      <ul className="space-y-3">
        {chats.map((c) => (
          <li key={c.id} className="border rounded p-4">
            <p className="font-medium">{c.title}</p>
            <p className="text-sm text-gray-500">
              {c._count.messages} mensagens · {c.updatedAt.toLocaleDateString('pt-BR')}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}