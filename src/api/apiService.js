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
            console.log("API Response:", response.data);
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


// Define your Base URL (adjust port if needed)
const BASE_URL = 'http://localhost:8080/api/v1';

export const fetchTripById = createAsyncThunk(
    'boards/fetchTripById',
    async (tripId, { rejectWithValue }) => {
        try {
            // Call the GET endpoint: /api/v1/trips/{id}
            const response = await axios.get(`${BASE_URL}/trips/${tripId}`);
            
            // The response.data is the Trip entity (which matches your TripPlan structure)
            console.log("Loaded Trip from DB:", response.data);
            return response.data; 
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to load trip';
            return rejectWithValue(message);
        }
    }
);