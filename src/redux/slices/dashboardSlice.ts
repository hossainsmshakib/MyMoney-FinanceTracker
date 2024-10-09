import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDashboardDataService } from "../../services/dashboardService";

interface DashboardState {
  summary: {
    totalIncome: number;
    totalExpenses: number;
    remainingBalance: number;
  };
  categoryExpenses: { category: string; amount: number }[];
  monthlyTrends: { month: string; income: number; expenses: number }[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  summary: {
    totalIncome: 0,
    totalExpenses: 0,
    remainingBalance: 0,
  },
  categoryExpenses: [],
  monthlyTrends: [],
  loading: false,
  error: null,
};

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchDashboardDataService();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload.summary;
        state.categoryExpenses = action.payload.categoryExpenses;
        state.monthlyTrends = action.payload.monthlyTrends;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;
