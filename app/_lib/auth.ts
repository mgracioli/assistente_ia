import { AuthResponse } from "./authTypes";

export async function Auth(): Promise<AuthResponse>  {



    const usuarioMock = {
        user: {
            id: 1,
            name: 'Michel Gracioli'
        }
    }

    return usuarioMock
}