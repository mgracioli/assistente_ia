// components/sidebar.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { SidebarLink } from './sidebarLink';

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
                        <SidebarLink
                            key={link.href}
                            href={link.href}
                            icon={link.icon}
                            label={link.label}
                            isParent={true}
                            isOpen={isOpen}
                        />

                        {/* Sublinks: só aparecem quando abertos e na área do link pai */}
                        {isOpen && showChildren && (
                            <div className="ml-6 mt-1 flex flex-col gap-1">
                                {link.children.map((child) => {
                                    return (
                                        <SidebarLink
                                            key={child.href}
                                            href={child.href}
                                            icon={child.icon}
                                            label={child.label}
                                            isParent={false}
                                            isOpen={isOpen}
                                        />
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