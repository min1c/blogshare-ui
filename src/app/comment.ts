export interface Comment {
    id: number;
    content: string;
    parentId: number;
    postId: number;
    replies: Reply
}

export interface Reply extends Array<Comment> {

}