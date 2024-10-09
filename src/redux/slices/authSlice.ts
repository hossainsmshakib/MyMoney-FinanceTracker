import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User, LoginCredentials, RegisterCredentials } from "../../types/Users";
import { api } from "../../services/api";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isAuthenticated: !!localStorage.getItem("user"),
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials) => {
    const response = await api.get("/users", {
      params: { username: credentials.username },
    });
    if (response.data.length === 0) {
      throw new Error("User not found");
    }
    const user = response.data[0];
    if (user.password !== credentials.password) {
      throw new Error("Invalid password");
    }
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (credentials: RegisterCredentials) => {
    const response = await api.post("/users", credentials);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    localStorage.removeItem("user");
    return Promise.resolve();
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
