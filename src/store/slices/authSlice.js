import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";

// Async Thunks
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authService.login(email, password);
      const { token, ...userData } = response.data.data;
      localStorage.setItem("token", token);
      return userData;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await authService.register(
        name,
        email,
        password,
        confirmPassword
      );
      const { token, ...userData } = response.data.data;
      localStorage.setItem("token", token);
      return userData;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return rejectWithValue(message);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await authService.getCurrentUser();
      return response.data.data;
    } catch (err) {
      localStorage.removeItem("token");
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  user: null,
  loading: true, // Start true to check auth on mount
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.error = null;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        // Don't set error here usually as it's just 'not logged in'
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
