// components/sidebarSpinner.tsx
'use client';

import { useLinkStatus } from 'next/link';

export function SidebarSpinner() {
  const { pending } = useLinkStatus(); // Esse hook só funciona dentro de um <Link>. Ele lê o status da navegação daquele link específico. Quando o usuário clica no link, pending vira true. Quando a nova rota é renderizada, pending volta para false

  if (!pending) return null;

  return (
    <span
      className="ml-auto w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"
      aria-label="Carregando"
    />
  );
}