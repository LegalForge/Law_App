import { apiClient } from "./Config";

export const registerUser = async (payload) => {
    return await apiClient.post('/users/register', payload);
}

export const loginUser = async (payload) => {
    return await apiClient.post('/users/login', payload);
}

export const logoutUser = async () => {
    return await apiClient.post('/users/logout');
}