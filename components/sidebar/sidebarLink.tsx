// components/sidebarLink.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarSpinner } from './sidebarSpinner';
import { SidebarLinkProps } from './sidebarTypes';

export function SidebarLink({ href, icon, label, isOpen, isParent }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);
//   const isParent = isParent 

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
        isActive
          ? (isParent ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white')
          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'
      }`}
    >
      <span>{icon}</span> {isOpen && <span className="truncate">{label}</span>} <SidebarSpinner />
    </Link>
  );
}