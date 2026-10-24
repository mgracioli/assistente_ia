// app/chat/_contexts/chatInputContext.tsx
'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const ChatInputContext = createContext<ChatInputContextValue | null>(null); // o valor inicial é null para forçar o uso do hook a validar se ele está dentro do provider. Se usar um valor "fake" como padrão, o erro passa despercebido

export function ChatInputProvider({ children, sendMessage, disabled }: ChatInputProviderProps) {
  const [input, setInput] = useState('');

  // handleSend - função que chama "sendMessage" que chama a rota POST para buscar a resposta da IA, fica aqui no context porque ela vai ser compartilhada entre a input e o botão de enviar mensagem
  // useCallback no handleSend: evita que a função seja recriada a cada render, evitando re-renders desnecessários nos consumidores.  no useCallBack a função só vai ser re-executada de algum dos parâmetros for alterado
  const handleSend = useCallback(() => { 
    const text = input.trim();
    if (!text || disabled) return;

    sendMessage(text);
    setInput('');
  }, [input, disabled, sendMessage]);

  return (
    <ChatInputContext.Provider value={{ input, setInput, handleSend, disabled }}> {/* input contém o valor digitado na textArea, setInput serve para atualizar o valor  da variável conforme for sendo digitado na textArea, handleSend é a função que tanto o Enter, quanto o botão vão executar para enviar a mensagem para a rota POST,  disabled é para desabilitar o botão e a textArea*/}
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