export default function HistoricoLayout({ children, }: { children: React.ReactNode }) {
    return (
        <body className="min-h-full flex flex-col">
            <header className="flex flex-col">
                Meu sistema - layout apenas da rota /chat/historico e suas rotas filhas - sobrescreve o layout global do sistema
            </header>

            <main className="flex flex-col">
                {children}  {/* children é o page.tsx dessa rota, ou seja, é o conteúdo da rota que será renderizada dentro desse layout */}
            </main>
        </body>
    )

  {/*return <section>{children}</section>*/}
}