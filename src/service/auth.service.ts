import { socialApi } from "@/api/social.api";
import { User } from "@/contexts/AuthContext";
import { ApiInterface } from "@/types/api.type";
import { AccessToken, CreateUser, UserInfo } from "@/types/auth.type";
import { AxiosResponse } from "axios";

export const authLogin = async (username: string, password: string): Promise<AxiosResponse<ApiInterface<AccessToken>>> => {
    return await socialApi.post("/auth/login", {username, password});
};


export const getProfile = async (accessToken: string): Promise<AxiosResponse<ApiInterface<UserInfo>>> => {
    return await socialApi.get(`/auth?accessToken=${accessToken}`);
};

export const getUserById = async (username: string): Promise<AxiosResponse<ApiInterface<UserInfo>>> => {
    return await socialApi.get(`/user/${username}`);
};



export const createUser = async(user:CreateUser): Promise<AxiosResponse<ApiInterface<User>>> => {
    return await socialApi.post(`/auth/sign-up`, user);
}