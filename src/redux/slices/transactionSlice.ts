import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  Transaction,
  AddTransactionPayload,
  EditTransactionPayload,
} from "../../types/Transaction";
import { api } from "../../services/api";

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (userId: string) => {
    const response = await api.get<Transaction[]>(
      `/transactions?userId=${userId}`
    );
    return response.data;
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transaction: AddTransactionPayload) => {
    const response = await api.post<Transaction>("/transactions", transaction);
    return response.data;
  }
);

export const editTransaction = createAsyncThunk(
  "transactions/editTransaction",
  async (transaction: EditTransactionPayload) => {
    const response = await api.put<Transaction>(
      `/transactions/${transaction.id}`,
      transaction
    );
    return response.data;
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id: string) => {
    await api.delete(`/transactions/${id}`);
    return id;
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch transactions";
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload
        );
      });
  },
});

export default transactionSlice.reducer;
