import axios from "axios";
import { MessageInterface } from "../interfaces/Message";

const API = axios.create({ baseURL: "http://localhost:3000/api" });

API.interceptors.request.use((request) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        request.headers.Authorization = token;
    }
    return request;
});

export const getMessagesByChat = async (chatId: string) => await API.get(`/message/${chatId}`);
export const createMessage = async (message: Partial<MessageInterface>) => await API.post('/message', message);
