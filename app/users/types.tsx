export type User = { 
    id: string; 
    name: string; 
    email: string 
};

export type UsersPage = { 
    users: User[]; 
    nextCursor: string | null 
};

export type fetchUsersProps = {
    pageParam: string | null;
}