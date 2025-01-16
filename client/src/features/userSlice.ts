import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../services/api';
import { ErrorType } from '../types/ErrorType';

// Define the user state type
interface UserState {
  loading: boolean;
  error: ErrorType | null;
  currentUser: {
    email: string;
    username: string;
    token: string;
  } | null;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};

// Async action for register
export const register = createAsyncThunk(
  'users/register',
  async (
    { username, email, password }: { username: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await API.post('/auth/register', { username, email, password });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || { message: 'Signup failed' });
    }
  }
);

// Async action for login
export const login = createAsyncThunk(
  'users/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await API.post('/auth/login', { email, password });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || { message: 'Login failed' });
    }
  }
);

const userSlilce = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      window.location.href = '/login';
    },
  },
  extraReducers: (builder) => {
    builder
    // Handle register
    .addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    })
    .addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as ErrorType; 
    })
    // Handle login
    .addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as ErrorType;
    });
  },
});

export const { logout } = userSlilce.actions;
export default userSlilce.reducer;
