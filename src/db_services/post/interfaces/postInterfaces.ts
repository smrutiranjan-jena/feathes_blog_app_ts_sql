export enum Post_Status {
    ACTIVE = 'active',
    DELETED = 'deleted'
}
export interface PostTable_GET {
    id: number;
    user: number,
    title: string,
    description: string,
    likeCount:number,
    commentCount:number,
    status: number;
    created_at: Date;
    updated_at: Date;
}
export interface PostTable_FIND {
    total: number;
    limit: number;
    skip: number;
    data: Array<PostTable_GET | null>;
}
export interface PostTable_POST {
    id: number,
    user: number,
    title: string,
    description: string,
    likeCount:number,
    commentCount:number,
    status: string;
    createdAt: Date,
    updatedAt: Date
}
export interface PostTable_PATCH {
    id?: number;
    user?: number,
    title?: string,
    description?: string,
    likeCount?:number,
    commentCount?:number
    status?: string;
}
export interface PostTable_QUERY {
    id?: number,
    user?: number,
    title?: string,
    description?: string,
    likeCount?:number,
    commentCount?:number,
    status?: string;
    createdAt?: Date,
    updatedAt?: Date
}
