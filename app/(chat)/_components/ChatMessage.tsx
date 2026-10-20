import {ChatMessageProps} from '../_types/chatTypes'

export function ChatMessage({messages}: ChatMessageProps) {
    return (
        <div className="flex flex-col">
            {messages.map((message) => (
                <div key={message.id} className="whitespace-pre-wrap mb-4">
                    <span className="font-bold">
                        {message.role === 'user' ? 'Você: ' : 'IA: '}
                    </span>

                    {message.parts.map((part, i) => {
                        console.log('aquiii: ', part)

                        switch(part.type)  {
                            case 'text':
                                return <span key={`${message.id}-${i}`}>{part.text}</span>;

                            case 'tool-getWeather': 
                                if (part.state === 'output-available') {    //output-available: a função execute terminou e retornou um resultado
                                    const output = part.output as { city: string; weather: string; temperature: string };
                                    
                                    return (
                                        <div key={`${message.id}-${i}`} className="text-sm text-blue-600 my-1">
                                            🌤️ Consultando clima de {output.city}: {output.weather}, {output.temperature}
                                        </div>
                                    );
                                }

                                return (
                                    <div key={`${message.id}-${i}`} className="text-sm text-gray-500 my-1">
                                        ⏳ Consultando clima...
                                    </div>
                                );

                            case 'tool-sendMail':
                                if (part.state === 'output-available') {
                                    const output = part.output as { dest: string; resp: string };
                                    
                                    return (
                                        <div key={`${message.id}-${i}`} className="text-sm text-blue-600 my-1">
                                            {output.resp} ao enviar e-mail para {output.dest}
                                        </div>
                                    );
                                }

                                return (
                                    <div key={`${message.id}-${i}`} className="text-sm text-gray-500 my-1">
                                        ⏳ Enviando e-mail...
                                    </div>
                                );  

                            default:
                                return null;       
                        }
                    })}
                </div>
            ))}
        </div>
    );
}