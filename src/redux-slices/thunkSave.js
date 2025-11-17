
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Make sure axios is imported

// Use your backend API URL
const API_URL = 'http://localhost:8080/api/v1/trips';

function reshapeBoardState(boardState) {
    const { location, budget, startDate, endDate, numberOfPeople, theme, boards, boardOrder, itemsById } = boardState;

    const days = boardOrder.map(boardId => {
        const board = boards[boardId];
        if (!board) return null;

        const hotel = board.hotel
            ? {
                hotelName: board.hotel.hotelName || "",
                location: board.hotel.location || "",
                pricePerNight: board.hotel.pricePerNight || 0,
                placeDetails: board.hotel.placeDetails || {}
            }
            : null;

        const itemsArray = Array.isArray(board.items) ? board.items : [];

        const activities = itemsArray.map(itemId => {
            const item = itemsById?.[itemId]; // Use top-level itemsById
            if (!item) return null;

            return {
                name: item.title || "",
                price: item.price || 0,
                duration: item.duration || "",
                placeDetails: item.placeDetails || {}
            };
        }).filter(Boolean);

        return {
            dayNumber: board.dayNumber || 0,
            date: board.date || "",
            weather: board.weather || {},
            hotel,
            activities
        };
    }).filter(Boolean);

    return {
        location: location || "",
        budget: budget || 0,
        startDate: startDate || "",
        endDate: endDate || "",
        numberOfPeople: numberOfPeople || 0,
        theme: theme || "",
        days
    };
}




/**
 * Thunk to save the current board state to the backend.
 * Accepts an optional 'userId' as an argument.
 */
export const logBoardsStateThunk = createAsyncThunk(
    'boards/saveTrip', // Renamed action type for clarity
    async (userId, { getState, rejectWithValue }) => {
        try {
            // 1. Get the current Redux state
            const state = getState();
            const boardState = state.boards;

            // 2. Reshape the data back into the TripPlan format
            const tripPlan = reshapeBoardState(boardState);
            
            console.log('Restored trip (Sending to API):', tripPlan);

            // 3. Construct the request body
            // Your backend expects: { userId: "...", plan: { ... } }
            const requestBody = {
                userId: userId || "default-user-id", // Fallback if no userId provided
                plan: tripPlan
            };

            // 4. Call the API
            const response = await axios.post(API_URL, requestBody);

            console.log('Save successful!', response.data);
            
            // 5. Return the saved trip (with ID) from the backend
            return response.data; 

        } catch (error) {
            console.error('Error saving trip:', error);
            const message = error.response?.data?.message || error.message || 'Failed to save trip';
            return rejectWithValue(message);
        }
    }
);

