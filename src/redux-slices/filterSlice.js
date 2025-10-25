import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    budget: [0, 50000],    
    headCount: 1,
    province: "Ontario",
    season: "Summer",
    date: new Date(),
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
    },
    setSeason: (state, action) => {
      state.season = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setBudget, setHeadCount, setProvince, setSeason, setDate } = filterSlice.actions;

export default filterSlice.reducer;
