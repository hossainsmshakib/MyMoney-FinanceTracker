import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchDashboardData } from "../redux/slices/dashboardSlice";
import Navbar from "../components/Navbar";
import TransactionSummary from "../components/dashboard/TransactionSummary";
import DataVisualization from "../components/dashboard/DataVisualization";

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">
            Oops! Something went wrong.
          </p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <TransactionSummary />
            <DataVisualization />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
