import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import transactionReducer from "./slices/transactionSlice";
import budgetReducer from "./slices/budgetSlice";
import dashboardReducer from "./slices/dashboardSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionReducer,
  budgets: budgetReducer,
  dashboard: dashboardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
