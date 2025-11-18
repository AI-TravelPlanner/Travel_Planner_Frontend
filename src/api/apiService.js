// thunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/plan/generate';
const BASE_URL = 'http://localhost:8080/api/v1';



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


/**
 * Thunk to fetch ALL trips for a specific user.
 * Payload (userId): string (email or uid)
 */
export const fetchUserTrips = createAsyncThunk(
    'boards/fetchUserTrips',
    async (userId, { rejectWithValue }) => {
        try {
            // Call: GET /api/v1/trips?userId=...
            const response = await axios.get(`${BASE_URL}/trips`, {
                params: { userId: userId }
            });
            
            // The API returns an array of Trip objects: [{id:..., location:...}, {...}]
            console.log("Fetched User Trips:", response.data);
            return response.data; 
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to fetch trips';
            return rejectWithValue(message);
        }
    }
);