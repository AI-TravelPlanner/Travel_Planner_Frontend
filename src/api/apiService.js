import axios from 'axios';

// 1. Create an 'axios' instance with a pre-configured baseURL.
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1', // Your Spring Boot backend
    headers: {
        'Content-Type': 'application/json',
    },
});
/**
 * 🤖 Generates a new trip plan from the AI
 * Calls: POST /plan/generate
 * This is the only function we'll focus on for now.
 */
export const generateTrip = async (prompt) => {
    try {
        // Use the apiClient instance
        const response = await apiClient.post('/plan/generate', { prompt: prompt });
        // 'axios' automatically gives you the JSON data in the 'data' property
        console.log('Trip generated:', response.data);
        return response.data;
    } catch (error) {
        // 'axios' automatically throws an error for bad statuses (4xx, 5xx)
        console.error('Error generating trip:', error.response?.data || error.message);
        throw error;
    }
};