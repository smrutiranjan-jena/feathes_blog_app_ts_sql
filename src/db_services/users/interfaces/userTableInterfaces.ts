export enum UserTableStatus {
    ACTIVE = "active",
    DELETED = "deleted",
}
export interface UserTable_GET {
    id: number;
    username: string,
    email: string,
    password: string,
    blogCount: number,
    followingCount: number,
    invitationCount: number,
    followersCount: number,
    status: string;
    created_at: Date;
    updated_at: Date;
}

export interface UserTable_FIND {
    total: number;
    limit: number;
    skip: number;
    data: Array<UserTable_GET | null>;
}

export interface UserTable_POST {
    id: number,
    username: string,
    email: string,
    password: string,
    blogCount: number,
    followingCount: number,
    invitationCount: number,
    followersCount: number,
    status: string,
    createdAt: Date,
    updatedAt: Date
}

export interface UserTable_PATCH {
    id?: number;
    username?: string,
    email?: string,
    password?: string,
    blogCount?: number,
    followingCount?: number,
    invitationCount?: number,
    followersCount?: number,
    status?: string;
}

export interface UserTable_QUERY {
    id?: number,
    username?: string,
    email?: string,
    password?: string,
    blogCount?: number,
    followingCount?: number,
    invitationCount?: number,
    followersCount?: number,
    status?: string,
    createdAt?: Date,
    updatedAt?: Date
}
