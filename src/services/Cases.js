import { apiClient } from "./Config";

export const getUserCases = async () => {
    return await apiClient.get('/users/me/cases');
}
export const getCases = async () => {
    return await apiClient.get('/cases');
}
export const getCaseById = async (caseId) => {
    return await apiClient.get(`/cases/${caseId}`);
}

export const createCase = async (payload, token) => {
    return await apiClient.post('/cases', payload, {
        headers: {
            'Authorization': `Bearer ${token}`,
            // If you're sending FormData, don't set Content-Type
            // It will be automatically set with the correct boundary
        }
    });
}

export const updateCase = async (id, payload) => {
    console.log('Update URL:', `/cases/${id}`);
    console.log('Update payload:', payload);
    return await apiClient.patch(`/cases/${id}`, payload);
}

export const deleteCase = async (id) => {
    try {
        const response = await apiClient.delete(`/cases/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const searchCases = async (query) => {
    const filter = JSON.stringify({ title: { $regex: query, $options: 'i' } });
    return await apiClient.get(`/cases?filter=${filter}`);
  };
