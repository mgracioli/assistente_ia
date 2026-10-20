// Camada de serviço na qual são aplicadas as regras de negócio

// Exemplo:
// import 'server-only'
// import { inserirProjeto } from '@/data/chat' // import da camada de acesso ao banco de dados

// export async function criarProjeto(input: { nome: string }) {
//   // Aqui entrariam as regras de negócio:
//   // verificar permissões, limites e outras condições.

//   return inserirProjeto(input)
// }