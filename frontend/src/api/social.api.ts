import { User } from '@/contexts/AuthContext';
import axios from 'axios';

export const socialApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

socialApi.interceptors.request.use(
    (config) => {
        const user: User = JSON.parse(localStorage.getItem('user'));

        if (user) {
            config.headers['Authorization'] = `Bearer ${user.token}`;
        }

        return config;
    }
)