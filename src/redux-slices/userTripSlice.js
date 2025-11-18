import { createSlice } from '@reduxjs/toolkit';
import { fetchUserTrips } from '../api/apiService'; // Import the thunk

const initialState = {
    trips: [], // The list of all saved trips
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const userTripsSlice = createSlice({
    name: 'userTrips',
    initialState,
    reducers: {
        // Optional: A reducer to clear the list when logging out
        clearUserTrips: (state) => {
            state.trips = [];
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserTrips.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserTrips.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Store the array of trips from the backend
                state.trips = action.payload;
            })
            .addCase(fetchUserTrips.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                console.error('Failed to load user trips:', action.payload);
            });
    },
});

export const { clearUserTrips } = userTripsSlice.actions;
export default userTripsSlice.reducer;