import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addBudget, updateBudget } from "../../redux/slices/budgetSlice";
import { Budget } from "../../types/Budget";
import {
  FaPlus,
  FaEdit,
  FaTag,
  FaDollarSign,
  FaCalendarAlt,
} from "react-icons/fa";

interface BudgetFormProps {
  initialBudget?: Budget;
  onSubmit?: () => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ initialBudget, onSubmit }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [budget, setBudget] = useState<Omit<Budget, "id">>({
    userId: user?.id || "",
    category: initialBudget?.category || "",
    amount: initialBudget?.amount || 0,
    month: initialBudget?.month || new Date().toISOString().slice(0, 7),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initialBudget) {
        await dispatch(
          updateBudget({ ...budget, id: initialBudget.id })
        ).unwrap();
      } else {
        await dispatch(addBudget(budget)).unwrap();
      }
      if (onSubmit) onSubmit();
      setBudget({
        userId: user?.id || "",
        category: "",
        amount: 0,
        month: new Date().toISOString().slice(0, 7),
      });
    } catch (error) {
      console.error("Failed to save budget:", error);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanedValue = value.replace(/^0+/, "").replace(/[^\d]/g, "");
    setBudget({
      ...budget,
      amount: cleanedValue ? parseInt(cleanedValue, 10) : 0,
    });
  };

  const inputClasses =
    "block w-full pl-10 pr-3 py-2 sm:text-sm border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-1 rounded-lg">
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Category
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaTag className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="category"
            value={budget.category}
            onChange={(e) => setBudget({ ...budget, category: e.target.value })}
            className={inputClasses}
            required
            placeholder="Enter budget category"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Amount
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaDollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            id="amount"
            value={budget.amount || ""}
            onChange={handleAmountChange}
            className={inputClasses}
            required
            placeholder="Enter budget amount"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="month"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Month
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaCalendarAlt className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="month"
            id="month"
            value={budget.month}
            onChange={(e) => setBudget({ ...budget, month: e.target.value })}
            className={inputClasses}
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 flex items-center justify-center"
      >
        {initialBudget ? (
          <>
            <FaEdit className="mr-2" />
            Update Budget
          </>
        ) : (
          <>
            <FaPlus className="mr-2" />
            Add Budget
          </>
        )}
      </button>
    </form>
  );
};

export default BudgetForm;
