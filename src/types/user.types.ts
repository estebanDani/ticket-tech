export interface User {
    uid: string;
    email: string;
    displayName: string;
    role:'user' | 'admin';
    createdAt: Date;
}

export type CreateUserDto = Omit<User, 'uid'>