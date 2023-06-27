import axios from 'axios';

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,OPTIONS,DELETE",
    "Access-Control-Allow-Credentials": true,
}

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers,
});

export const useApi = () => ({
    validateToken: async (token: string) => {
        const response = await api.get(`/auth/validate?token=${token}`);
        return response.data;
    },
    signin: async (email: string, password: string) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },
    logout: async () => {
        return;
    }
});
