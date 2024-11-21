import { apiClient } from "./Config";

export const createQuiz = async (payload, token) => {
    return await apiClient.post('/quizzes', payload, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
}
export const getQuizzes = async () => {
    return await apiClient.get('/quizzes');
}
export const getQuizById = async (quizId) => {
    return await apiClient.get(`/quizzes/${quizId}`);
}

// export const updateQuiz = async (id, payload) => {
//     return await apiClient.patch(`/quizzes/${id}`, payload, {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
// }
export const updateQuiz = async (quizId, payload) => {
    return await apiClient.patch(`/quizzes/${quizId}`, payload);
}

// export const deleteQuiz = async (id) => {
//     try {
//         const response = await apiClient.delete(`/quizzes/${id}`);
//         return response;
//     } catch (error) {
//         throw error;
//     }
// }
export const deleteQuiz = async (quizId) => {
    return await apiClient.delete(`/quizzes/${quizId}`);
    
}

export const searchQuizzes = async (query) => {
    const filter = JSON.stringify({ title: { $regex: query, $options: 'i' } });
    return await apiClient.get(`/quizzes?filter=${filter}`);
};
