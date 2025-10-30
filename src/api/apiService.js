// thunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/plan/generate';

/**
 * Thunk to fetch a new trip plan from the API using a prompt.
 * Payload (promptData): { prompt: string }
 */
export const fetchTripPlan = createAsyncThunk(
    'boards/fetchTripPlan',
    async (promptData, { rejectWithValue }) => {
        try {
            // Use axios.post, passing the promptData as the request body
            const response = await axios.post(API_URL, promptData);
            // The API response is the raw JSON trip plan
            return response.data; 
        } catch (error) {
          // *** THIS IS THE FIX ***
            // We pass a simple, serializable error message
            // or the specific error data from the server response.
            const message = error.response?.data?.message || error.message || 'Failed to fetch plan';
            return rejectWithValue(message);
        }
    }
);