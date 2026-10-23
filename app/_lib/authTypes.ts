import { ZodCUID2 } from "zod"

type AuthUser = {
    id: string,
    name: string
}

export type AuthResponse = {
    user: AuthUser
}