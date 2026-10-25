// app/chat/_contexts/chatInputContext.tsx
'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import {ChatInputContextValue, ChatInputProviderProps} from './chatInputContextTypes'
import { LocalAttachment } from '../types';

const ChatInputContext = createContext<ChatInputContextValue | null>(null); // o valor inicial é null para forçar o uso do hook a validar se ele está dentro do provider. Se usar um valor "fake" como padrão, o erro passa despercebido

export function ChatInputProvider({ children, sendMessage, disabled }: ChatInputProviderProps) {
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<LocalAttachment[]>([]);
  
  const addAttachments = useCallback((files: File[]) => {
    const MAX_SIZE = 3 * 1024 * 1024; // 3MB
    const valid = files.filter((f) => f.size <= MAX_SIZE);
    
    if (valid.length < files.length) {
      // mostrar toast de erro: cada arquivo deve ter, no maximo, 3MB
    }

    const mapped = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : '',
    }));

    setAttachments((prev) => [...prev, ...mapped]);
  }, []);

  const removeAttachment = useCallback((id: string) => {  // id serve como key no e como identificador para remoção. Sem isso, remover por índice quebra quando a lista muda
    setAttachments((prev) => {
      const target = prev.find((a) => a.id === id);

      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl); // libera a memória do blob

      return prev.filter((a) => a.id !== id);
    });
  }, []);

  // limpa o estado antes de chamar onSend: assim o usuário vê o input limpar imediatamente, mesmo que o envio demore
  // assíncrono: o ChatPage vai precisar converter os anexos para Uint8Array (que é async), então handleSend aguarda
  const handleSend = useCallback(async () => {
    const text = input.trim();
    
    if ((!text && attachments.length === 0) || disabled) return;

    const payload = { text, attachments };

    setInput('');

    setAttachments((prev) => {
      prev.forEach((a) => a.previewUrl && URL.revokeObjectURL(a.previewUrl)); // libera a memória do blob  / libera as URLs de preview
      return [];
    });

    await sendMessage(payload);
  }, [input, attachments, disabled, sendMessage]);


  return (
    <ChatInputContext.Provider value={{ input, setInput, attachments, addAttachments, removeAttachment, handleSend, disabled }}> {/* input contém o valor digitado na textArea, setInput serve para atualizar o valor da variável conforme for sendo digitado na textArea, handleSend é a função que tanto o Enter, quanto o botão vão executar para enviar a mensagem para a rota POST, disabled é para desabilitar o botão e a textArea; addAttachments e removerAttachments adicionam e removem anexos */}
      {children}
    </ChatInputContext.Provider>
  );
}

// Hook que permite usar o context - só pode ser usado dentro do provider
export function useChatInput() {
  const ctx = useContext(ChatInputContext);
  if (!ctx) {
    throw new Error('useChatInput deve ser usado dentro do provider <ChatInputProvider>');
  }

  return ctx;
}