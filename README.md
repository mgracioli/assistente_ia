Aplicação Next com integração IA via API Google Gemini 

Etapas da criação do programa
1. A arquitetura inicial foi pensada para ser um monolito, já que se trata de um app simples construído com o intuito de aplicar os novos conceitos aprendidos. Com o escalar da aplicação, a separação entre front e back-end será feita.

2. Chat - Implementação do sistema de chat com a API Google Gemini e implementação de duas ferramentas para o modelo utilizar:
    - GetWeather:  que retorna o clima em determinado local
    - SendMail: que simula o envio de um e-mail 

3. Users - Implementação da biblioteca tanStack Query para gerenciamento de estado dos dados vindos do servidor
    - Busca dos dados de usuários com cache (queryKey: ['users']) para montagem da lista
    - Paginação inifinita com useInfiniteQuery

4. Chat - Implementação da Server Action de salvamento das mensagens do chat (saveChatAction)
    - Salva as mensagens do chat no banco sem precisar passar por uma rota de API e sem controle manual com useState

5. Chat - Implementação de context API (chatInputContext)
    - Esse contexto compartilha informações entre a input e o botão de enviar mensagem