import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  fetchTransactions,
  deleteTransaction,
} from "../../redux/slices/transactionSlice";
import { Transaction } from "../../types/Transaction";
import {
  FaFilter,
  FaCalendarAlt,
  FaTags,
  FaExchangeAlt,
  FaTrash,
  FaUndo,
} from "react-icons/fa";

const TransactionList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { transactions, loading } = useAppSelector(
    (state) => state.transactions
  );
  const { user } = useAppSelector((state) => state.auth);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [filter, setFilter] = useState({
    type: "all",
    category: "all",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (user) {
      dispatch(fetchTransactions(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    setFilteredTransactions(
      transactions.filter((transaction) => {
        const dateInRange =
          (!filter.startDate ||
            new Date(transaction.date) >= new Date(filter.startDate)) &&
          (!filter.endDate ||
            new Date(transaction.date) <= new Date(filter.endDate));
        return (
          (filter.type === "all" || transaction.type === filter.type) &&
          (filter.category === "all" ||
            transaction.category.toLowerCase() ===
              filter.category.toLowerCase()) &&
          dateInRange
        );
      })
    );
  }, [transactions, filter]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const resetFilter = () => {
    setFilter({
      type: "all",
      category: "all",
      startDate: "",
      endDate: "",
    });
  };

  const formatAmount = (amount: number | string) => {
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    return isNaN(numAmount) ? "0.00" : numAmount.toFixed(2);
  };

  if (loading) {
    return <div className="text-center py-4 text-gray-600">Loading...</div>;
  }

  const categories = Array.from(
    new Set(transactions.map((t) => t.category.toLowerCase()))
  )
    .sort()
    .map((category) => category.charAt(0).toUpperCase() + category.slice(1));

  const inputClasses =
    "block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200";

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-9 gap-4">
          <div className="relative sm:col-span-1 lg:col-span-2">
            <FaExchangeAlt className="absolute top-3 left-3 text-gray-400" />
            <select
              name="type"
              value={filter.type}
              onChange={handleFilterChange}
              className={inputClasses}
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="relative sm:col-span-1 lg:col-span-2">
            <FaTags className="absolute top-3 left-3 text-gray-400" />
            <select
              name="category"
              value={filter.category}
              onChange={handleFilterChange}
              className={inputClasses}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="relative sm:col-span-1 lg:col-span-2">
            <FaCalendarAlt className="absolute top-3 left-3 text-gray-400" />
            <input
              type="date"
              name="startDate"
              value={filter.startDate}
              onChange={handleFilterChange}
              className={inputClasses}
              placeholder="Start Date"
            />
          </div>
          <div className="relative sm:col-span-1 lg:col-span-2">
            <FaCalendarAlt className="absolute top-3 left-3 text-gray-400" />
            <input
              type="date"
              name="endDate"
              value={filter.endDate}
              onChange={handleFilterChange}
              className={inputClasses}
              placeholder="End Date"
            />
          </div>
          <button
            onClick={resetFilter}
            className="flex items-center justify-center p-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            title="Reset filters"
          >
            <FaUndo />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="space-y-4">
          {filteredTransactions.map((transaction: Transaction) => (
            <div
              key={transaction.id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center transition duration-150 ease-in-out"
            >
              <div className="flex-grow">
                <h3 className="font-medium text-gray-900">
                  {transaction.description}
                </h3>
                <p className="text-sm text-gray-500">
                  {transaction.category} •{" "}
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <p
                  className={`font-medium ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}$
                  {formatAmount(transaction.amount)}
                </p>
                <button
                  onClick={() => dispatch(deleteTransaction(transaction.id))}
                  className="text-gray-400 hover:text-red-600 transition duration-150 ease-in-out focus:outline-none"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
