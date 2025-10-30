import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for your search parameters
const initialState = {
  destination: '',
  checkIn: '',
  checkOut: '',
  travelers: '',
};

export const tripSearchSlice = createSlice({
  name: 'tripSearch',
  initialState,
  // Reducers define how to update the state
  reducers: {
    // action.payload will be the new value from the input
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setCheckIn: (state, action) => {
      state.checkIn = action.payload;
    },
    setCheckOut: (state, action) => {
      state.checkOut = action.payload;
    },
    setTravelers: (state, action) => {
      state.travelers = action.payload;
    },
    // You can also add a reducer to clear the search
    resetSearch: () => initialState,
  },
});

// Export the action creators
export const {
  setDestination,
  setCheckIn,
  setCheckOut,
  setTravelers,
  resetSearch,
} = tripSearchSlice.actions;

// Export the reducer function
export default tripSearchSlice.reducer;