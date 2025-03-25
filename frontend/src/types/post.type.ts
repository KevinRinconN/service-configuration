export interface Post {
    id: string;
    title: string;
    content: string;
    user: UserPost
    likes: number;
    likedByUser: boolean;
    comments: number;
    createdAtFormatted: Date;
    liked: boolean;
    
}

interface UserPost{
    username: string;
    userProfilePicture?: string;
}

export interface CreatePost {
    content: string;
    userId: string;
}   

export interface Comment {
    id: number;
    content: string;
    createdAtFormatted: Date;
    user: UserPost;
}