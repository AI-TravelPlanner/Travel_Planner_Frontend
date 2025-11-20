import { createSlice } from '@reduxjs/toolkit';

// Helper function to serialize Firebase user
const serializeUser = (user) => {
  if (!user) return null;
  
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
    // Add any other properties you need
    firstName: user.firstName || null,
    lastName: user.lastName || null,
  };
};

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Serialize the user before storing
      state.user = serializeUser(action.payload);
    },
    clearUser: (state) => {
      state.user = null;
    },
    logout: (state) => {
      // Alias for clearUser to support both names
      state.user = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;