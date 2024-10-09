import React from "react";
import Navbar from "../components/Navbar";
import TransactionList from "../components/transactions/TransactionList";
import TransactionForm from "../components/transactions/TransactionForm";
import { FaPlus, FaHistory } from "react-icons/fa";

const TransactionsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-full">
            <div className="lg:col-span-1">
              <h2 className="text-xl font-light text-gray-800 mb-4 flex items-center">
                <FaPlus className="mr-2 text-gray-400" />
                Add Transaction
              </h2>
              <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
                <TransactionForm />
              </div>
            </div>
            <div className="lg:col-span-2 flex flex-col h-full">
              <h2 className="text-xl font-light text-gray-800 mb-4 flex items-center">
                <FaHistory className="mr-2 text-gray-400" />
                Transaction History
              </h2>
              <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 flex-1 overflow-hidden">
                <TransactionList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
