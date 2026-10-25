// app/chat/_components/sendMessageButton.tsx
import { useChatInput } from "../_contexts/chatInputContext";

export function SendMessageButton() {
    const { input, handleSend, disabled, attachments } = useChatInput(); // hook do chatInputContext
    const isEmpty = !input.trim() && attachments.length === 0;

    return (
        <button
            type="submit"
            onClick={handleSend}
            disabled={disabled || isEmpty}
            className="px-3 py-1 rounded-full bg-blue-600 text-white disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Enviar mensagem"
        >
            ➤
        </button>
    )
}