import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000/api" });

API.interceptors.request.use((request) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        request.headers.Authorization = `${token}`;
    }
    return request;
});

export const createChat = async (data: any) => await API.post('/chat', data);
export const getUserChats = async (userId: string) => await API.get(`/chat/${userId}`);
export const findChat = async (firstId: string, secondId: string) => await API.get(`/chat/find/${firstId}/${secondId}`);
