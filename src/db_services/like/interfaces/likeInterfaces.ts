export enum Like_Status {
    ACTIVE = 'active',
    DELETED = 'deleted'
}
export interface LikeTable_GET {
    id: number,
    post: number,
    user: number,
    status: string,
    created_at: Date,
    updated_at: Date
}
export interface LikeTable_FIND {
    total: number,
    skip: number,
    limit: number,
    data: Array<LikeTable_GET | null>
}
export interface LikeTable_POST {
    id: number,
    post: number,
    user: number,
    status: string,
    createdAt: Date,
    updatedAt: Date
}
export interface LikeTable_PATCH {
    id?: number,
    post?: number,
    user?: number,
    status?: string,
    createdAt?: Date,
    updatedAt?: Date
}
export interface LikeTable_QUERY {
    id?: number,
    post?: number,
    user?: number,
    status?: string,
    createdAt?: Date,
    updatedAt?: Date
}