// components/sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
    { 
        href: '/chat', 
        label: 'Chat', 
        icon: '💬' 
    },
    { 
        href: '/users', 
        label: 'Usuários', 
        icon: '👥',
        children: [
            {   
                href: '/users/cadastro', 
                label: 'Novo usuário', 
                icon: '➕' 
            },
        ] 
    },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (     
    <aside 
        className={`
            sticky top-0 h-screen shrink-0
            border-r border-zinc-200 dark:border-zinc-800
            bg-zinc-50 dark:bg-zinc-950
            p-3 overflow-y-auto
            transition-[width] duration-200 ease-in-out
            ${isOpen ? 'w-64' : 'w-16'}
        `}
    >
        <div className={`flex items-center mb-8 px-1 ${isOpen ? 'justify-between' : 'justify-center'}`}>
            {isOpen && <h1 className="text-lg font-bold truncate">Menu Principal</h1>}

            <button
                type="button"
                onClick={toggle}
                className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors shrink-0"
                aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={isOpen}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </button>
        </div>

        <nav className="flex flex-col gap-1">
            {links.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                const showChildren = link.children && link.children.length > 0 && isActive;

                return (
                    <div key={link.href}>
                        <Link 
                            href={link.href}
                            title={!isOpen ? link.label : undefined}
                            className={`
                                flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                                'justify-center'
                                ${isActive
                                ? 'bg-blue-600 text-white'
                                : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'}
                            `}
                        >
                            <span className="shrink-0">{link.icon}</span>
                            {isOpen && <span className="truncate">{link.label}</span>}
                        </Link>

                        {/* Sublinks: só aparecem quando abertos e na área do pai */}
                        {isOpen && showChildren && (
                            <div className="ml-6 mt-1 flex flex-col gap-1">
                                {link.children.map((child) => {
                                    const childActive = pathname === child.href;

                                    return (
                                        <Link
                                            key={child.href}
                                            href={child.href}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                                            childActive
                                                ? 'bg-blue-500 text-white'
                                                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                                            }`}
                                        >
                                            <span>{child.icon}</span>
                                            <span>{child.label}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </nav>
    </aside>
  );
}