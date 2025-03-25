import { socialApi } from "@/api/social.api";
import { ApiInterface, Page } from "@/types/api.type";
import { Comment, CreatePost, Post } from "@/types/post.type";
import { AxiosResponse } from "axios";

interface PostParams {
    username?: string;
    liked?: boolean;
}

export const getPosts = async (params?: PostParams): Promise<AxiosResponse<ApiInterface<Page<Post>>>> => {
    const queryParams = new URLSearchParams();

    if (params?.username) queryParams.append("username", params.username);
    if (params?.liked !== undefined) queryParams.append("liked", String(params.liked));

    const queryString = queryParams.toString() ? `&${queryParams.toString()}` : "";

    return await socialApi.get(`/post?sort=id,desc${queryString}`);
};

export const createPost = async (post: CreatePost): Promise<AxiosResponse<ApiInterface<Post>>> => {
    return await socialApi.post(`/post`, post);
};


export const getLikedPosts = async (username: string): Promise<AxiosResponse<ApiInterface<Post[]>>> => {
    return await socialApi.get(`/post/liked/${username}`);
};

//comentarios

export const getCommentsByPost = async (postId: string): Promise<AxiosResponse<ApiInterface<Comment[]>>> => {
    return await socialApi.get(`/comment/post/${postId}`);
};


export const createComment = async (postId: string, content: string):Promise<AxiosResponse<ApiInterface<Comment>>> => {
    return await socialApi.post(`/comment/post/${postId}`, {content});
}

// like
export const updateToggleLike = async (postId: string):Promise<AxiosResponse<ApiInterface<Post>>> => {
    return await socialApi.put(`/post/${postId}/like`);
}
