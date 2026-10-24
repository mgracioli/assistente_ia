// app/_lib/auth.ts
import { AuthResponse } from "./authTypes";

export async function Auth(): Promise<AuthResponse>  {

    const usuarioMock = {
        user: {
            id: 'r3m5k9eot9th8zww9o1s7y0k',
            name: 'Michel Gracioli'
        }
    }

    return usuarioMock
}