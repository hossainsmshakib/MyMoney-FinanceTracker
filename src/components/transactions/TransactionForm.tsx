import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { addTransaction } from "../../redux/slices/transactionSlice";
import { AddTransactionPayload } from "../../types/Transaction";
import {
  FaEdit,
  FaTag,
  FaExchangeAlt,
  FaDollarSign,
  FaCalendarAlt,
  FaPlus,
} from "react-icons/fa";

type FormTransactionPayload = Omit<AddTransactionPayload, "type"> & {
  type: "" | "income" | "expense";
};

const TransactionForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [transaction, setTransaction] = useState<FormTransactionPayload>({
    description: "",
    category: "",
    type: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transaction.type) {
      dispatch(addTransaction(transaction as AddTransactionPayload));
      setTransaction({
        description: "",
        category: "",
        type: "",
        amount: 0,
        date: new Date().toISOString().split("T")[0],
      });
    } else {
      alert("Please select a transaction type");
    }
  };

  const inputClasses =
    "block w-full pl-10 pr-3 py-2 sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-1 rounded-lg">
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <div className="relative rounded-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaEdit className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="description"
            name="description"
            value={transaction.description}
            onChange={handleChange}
            required
            className={inputClasses}
            placeholder="Enter transaction description"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Category
        </label>
        <div className="relative rounded-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaTag className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="category"
            name="category"
            value={transaction.category}
            onChange={handleChange}
            required
            className={inputClasses}
            placeholder="Enter transaction category"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Type
        </label>
        <div className="relative rounded-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaExchangeAlt className="h-5 w-5 text-gray-400" />
          </div>
          <select
            id="type"
            name="type"
            value={transaction.type}
            onChange={handleChange}
            required
            className={`${inputClasses} appearance-none`}
          >
            <option value="">Select type</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
      </div>
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Amount
        </label>
        <div className="relative rounded-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaDollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            id="amount"
            name="amount"
            value={transaction.amount}
            onChange={handleChange}
            required
            className={inputClasses}
            placeholder="Enter transaction amount"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Date
        </label>
        <div className="relative rounded-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaCalendarAlt className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="date"
            id="date"
            name="date"
            value={transaction.date}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 flex items-center justify-center"
      >
        <FaPlus className="mr-2" />
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
