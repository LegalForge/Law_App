import { apiClient } from "./Config";

export const getCases = async () => {
    return await apiClient.get('/cases');
}
export const getCaseById = async (id) => {
    return await apiClient.get(`/cases/${id}`);
}

export const createCase = async (payload) => {
    return await apiClient.post('/cases', payload);
}

export const updateCase = async (id, payload) => {
    return await apiClient.patch(`/cases/${id}`, payload);
}

export const deleteCase = async (id) => {
    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    
    return await apiClient.delete(`/cases/${id}`, { headers });
}

export const searchCases = async (query) => {
    const filter = JSON.stringify({ title: { $regex: query, $options: 'i' } });
    return await apiClient.get(`/cases?filter=${filter}`);
  };
