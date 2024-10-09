import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { fetchBudgets } from "../redux/slices/budgetSlice";
import { fetchTransactions } from "../redux/slices/transactionSlice";
import Navbar from "../components/Navbar";
import BudgetForm from "../components/budget/BudgetForm";
import BudgetList from "../components/budget/BudgetList";
import { Budget, BudgetStatus } from "../types/Budget";
import { Transaction } from "../types/Transaction";
import { FaPlus, FaChartPie } from "react-icons/fa";

const BudgetPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { budgets } = useAppSelector((state) => (state as any).budgets);
  const { transactions } = useAppSelector((state) => state.transactions);
  const [budgetStatuses, setBudgetStatuses] = useState<BudgetStatus[]>([]);

  const fetchBudgetData = () => {
    if (user) {
      dispatch(fetchBudgets(user.id));
      dispatch(fetchTransactions(user.id));
    }
  };

  useEffect(() => {
    fetchBudgetData();
  }, [dispatch, user]);

  useEffect(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const statuses = budgets.map((budget: Budget) => {
      const spent = transactions
        .filter(
          (t: Transaction) =>
            t.category.toLowerCase() === budget.category.toLowerCase() &&
            t.date.startsWith(currentMonth) &&
            t.type === "expense"
        )
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0);
      return {
        ...budget,
        spent,
        remaining: budget.amount - spent,
      };
    });
    setBudgetStatuses(statuses);
  }, [budgets, transactions]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-full">
            <div className="lg:col-span-1">
              <h2 className="text-xl font-light text-gray-800 mb-4 flex items-center">
                <FaPlus className="mr-2 text-gray-400" />
                Add Budget
              </h2>
              <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
                <BudgetForm onSubmit={fetchBudgetData} />
              </div>
            </div>
            <div className="lg:col-span-2 flex flex-col h-full">
              <h2 className="text-xl font-light text-gray-800 mb-4 flex items-center">
                <FaChartPie className="mr-2 text-gray-400" />
                Budget Overview
              </h2>
              <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 flex-1 overflow-hidden">
                <BudgetList budgets={budgetStatuses} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
