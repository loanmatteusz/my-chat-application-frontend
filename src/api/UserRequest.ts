import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000/api" });

API.interceptors.request.use((request) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        request.headers.Authorization = token;
    }
    return request;
});

export const getAllUser = async () => await API.get('/users');
export const getUserById = async (id: string) => await API.get(`/users/${id}`);
export const updateUser = async (id: string, data: any) => await API.put(`/users/${id}`, data);
export const deleteUser = async (id: string) => await API.delete(`/users/${id}`);
