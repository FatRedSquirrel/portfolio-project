export enum UserRole {
    ADMIN = 'ADMIN',
    VIEWER = 'VIEWER',
    MANAGER = 'MANAGER'
}

export interface User {
    id: string
    username: string
    avatar?: string
    roles?: UserRole[]
}

export interface UserSchema {
    authData?: User

    _inited: boolean
}
