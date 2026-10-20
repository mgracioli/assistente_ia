// camada de autenticação do usuário
// criar objeto de autenticação

//app/lib/auth.ts
import { AuthResponse } from './authTypes'

export async function Auth(): Promise<AuthResponse> {
    const resp = {
        token: 'AhsyIUASbDSUADJio',
        user: {
            id: '123456',
            name: 'John Doe',
            email: 'teste@teste.com'
        },
        expiresIn: 365
    }

    return resp
}