import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    budget: [0, 50000],
    headCount: 1,
    province: "Ontario",
    city: "", 
    season: "Summer",
    date: new Date().toISOString(), // Store as ISO string instead of Date object
  },
  reducers: {
    setBudget: (state, action) => {
      state.budget = action.payload;
    },
    setHeadCount: (state, action) => {
      state.headCount = action.payload;
    },
    setProvince: (state, action) => {
      state.province = action.payload;
      state.city = ""; 
    },
    setCity: (state, action) => { 
      state.city = action.payload;
    },
    setSeason: (state, action) => {
      state.season = action.payload;
    },
    setDate: (state, action) => {
      // Convert Date object to ISO string for serialization
      if (action.payload instanceof Date) {
        state.date = action.payload.toISOString();
      } else if (typeof action.payload === 'string') {
        state.date = action.payload;
      } else if (action.payload) {
        state.date = new Date(action.payload).toISOString();
      } else {
        state.date = null;
      }
    },
  },
});

export const { setBudget, setHeadCount, setProvince, setCity, setSeason, setDate } =
  filterSlice.actions;

export default filterSlice.reducer;

// Selector to get date as Date object
export const selectDate = (state) => {
  if (!state.filter.date) return null;
  return new Date(state.filter.date);
};

// Selector to get date as formatted string
export const selectDateFormatted = (state) => {
  if (!state.filter.date) return '';
  return new Date(state.filter.date).toLocaleDateString();
};