export function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-10 h-10 border-4 border-zinc-300 dark:border-zinc-700 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-sm text-zinc-500 dark:text-zinc-400">Carregando...</p>
    </div>
  );
}

// export function Loading() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
//       <svg className="w-10 h-10 animate-spin text-blue-600" viewBox="0 0 24 24" fill="none">
//         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
//         <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
//       </svg>
//       <p className="text-sm text-zinc-500">Carregando...</p>
//     </div>
//   );
// }