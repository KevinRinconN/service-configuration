import { User } from "@/contexts/AuthContext";

export interface AccessToken {
    accessToken: string;
}

export interface UserInfo extends Omit<User, 'token'> {};

export interface CreateUser {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    bio?: string;
    password: string;
    rol: string;
}