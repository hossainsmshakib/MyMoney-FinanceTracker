import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Budget, BudgetStatus } from "../../types/Budget";
import { api } from "../../services/api";

interface BudgetState {
  budgets: Budget[];
  loading: boolean;
  error: string | null;
}

const initialState: BudgetState = {
  budgets: [],
  loading: false,
  error: null,
};

export const fetchBudgets = createAsyncThunk(
  "budgets/fetchBudgets",
  async (userId: string) => {
    const response = await api.get(`/budgets?userId=${userId}`);
    return response.data;
  }
);

export const addBudget = createAsyncThunk(
  "budgets/addBudget",
  async (budget: Omit<Budget, "id">) => {
    const response = await api.post("/budgets", budget);
    return response.data;
  }
);

export const updateBudget = createAsyncThunk(
  "budgets/updateBudget",
  async (budget: Budget) => {
    const response = await api.put(`/budgets/${budget.id}`, budget);
    return response.data;
  }
);

const budgetSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets = action.payload;
        state.error = null;
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch budgets";
      })
      .addCase(addBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets.push(action.payload);
        state.error = null;
      })
      .addCase(addBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add budget";
      })
      .addCase(updateBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBudget.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.budgets.findIndex(
          (b) => b.id === action.payload.id
        );
        if (index !== -1) {
          state.budgets[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update budget";
      });
  },
});

export default budgetSlice.reducer;
