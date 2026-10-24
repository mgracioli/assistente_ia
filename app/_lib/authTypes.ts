// app/_lib/authTypes.ts
type AuthUser = {
    id: string,
    name: string
}

export type AuthResponse = {
    user: AuthUser
}