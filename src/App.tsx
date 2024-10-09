import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import BudgetPage from "./pages/BudgetPage";
import TransactionsPage from "./pages/TransactionPage";

const App: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({
    element,
  }) => {
    return isAuthenticated ? element : <Navigate to="/login" replace />;
  };

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<DashboardPage />} />}
        />
        <Route
          path="/budgets"
          element={<ProtectedRoute element={<BudgetPage />} />}
        />
        <Route
          path="/transactions"
          element={<ProtectedRoute element={<TransactionsPage />} />}
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
};

export default App;
