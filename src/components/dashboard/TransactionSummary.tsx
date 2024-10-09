import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { FaArrowUp, FaArrowDown, FaBalanceScale } from "react-icons/fa";

const TransactionSummary: React.FC = () => {
  const { summary } = useAppSelector((state) => state.dashboard);

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg rounded-lg p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Financial Overview</h2>
      <div className="space-y-6">
        <SummaryItem
          label="Total Income"
          value={summary.totalIncome}
          icon={<FaArrowUp />}
          textColor="text-green-300"
        />
        <SummaryItem
          label="Total Expenses"
          value={summary.totalExpenses}
          icon={<FaArrowDown />}
          textColor="text-red-300"
        />
        <div className="pt-4 border-t border-blue-400">
          <SummaryItem
            label="Remaining Balance"
            value={summary.remainingBalance}
            icon={<FaBalanceScale />}
            textColor="text-yellow-300"
            large
          />
        </div>
      </div>
    </div>
  );
};

interface SummaryItemProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  textColor: string;
  large?: boolean;
}

const SummaryItem: React.FC<SummaryItemProps> = ({
  label,
  value,
  icon,
  textColor,
  large = false,
}) => (
  <div
    className={`flex items-center justify-between ${large ? "text-lg" : ""}`}
  >
    <div className="flex items-center space-x-2">
      <span className={`${textColor}`}>{icon}</span>
      <span className="text-blue-100">{label}</span>
    </div>
    <span className={`font-semibold ${textColor}`}>
      $
      {value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </span>
  </div>
);

export default TransactionSummary;
