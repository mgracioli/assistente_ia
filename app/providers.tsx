// app/providers.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
    // O useState com inicializador garante que o QueryClient seja criado uma única vez no cliente, evitando vazamento de estado entre 
    // requisições durante a renderização no servidor    
    const [queryClient] = useState(
        () =>
        new QueryClient({
            defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // Evita refetch imediato de dados que já vieram do servidor
            },
            },
        })
    )

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}