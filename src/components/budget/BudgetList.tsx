import React from "react";
import { BudgetStatus } from "../../types/Budget";
import {
  FaMoneyBillWave,
  FaChartPie,
  FaPiggyBank,
  FaExclamationTriangle,
  FaCheckCircle,
  FaExclamationCircle,
  FaMinusCircle,
} from "react-icons/fa";

interface BudgetListProps {
  budgets: BudgetStatus[];
}

const BudgetList: React.FC<BudgetListProps> = ({ budgets }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleString("default", { month: "short", year: "numeric" });
  };

  const getBudgetStatus = (spent: number, amount: number) => {
    const percentage = (spent / amount) * 100;
    if (percentage === 0)
      return { color: "text-blue-500", icon: FaMinusCircle, text: "Unused" };
    if (percentage < 50)
      return { color: "text-green-500", icon: FaCheckCircle, text: "On Track" };
    if (percentage < 90)
      return {
        color: "text-yellow-500",
        icon: FaExclamationCircle,
        text: "Caution",
      };
    if (percentage <= 100)
      return {
        color: "text-orange-500",
        icon: FaExclamationCircle,
        text: "Warning",
      };
    return {
      color: "text-red-600",
      icon: FaExclamationTriangle,
      text: "Exceeded",
    };
  };

  const getCardStyle = (spent: number, amount: number) => {
    const percentage = (spent / amount) * 100;
    if (percentage === 0)
      return { borderColor: "border-blue-500", bgColor: "bg-blue-100" };
    if (percentage < 50)
      return { borderColor: "border-green-500", bgColor: "bg-green-100" };
    if (percentage < 90)
      return { borderColor: "border-yellow-500", bgColor: "bg-yellow-100" };
    if (percentage <= 100)
      return { borderColor: "border-orange-500", bgColor: "bg-orange-100" };
    return { borderColor: "border-red-600", bgColor: "bg-red-100" };
  };

  const CircularProgress: React.FC<{ percentage: number; color: string }> = ({
    percentage,
    color,
  }) => {
    const circumference = 2 * Math.PI * 20;
    const strokeDashoffset =
      circumference - (Math.min(percentage, 100) / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg className="w-12 h-12 transform -rotate-90">
          <circle
            className="text-gray-200"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r="20"
            cx="24"
            cy="24"
          />
          <circle
            className={color}
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="20"
            cx="24"
            cy="24"
          />
        </svg>
        <span className="absolute text-xs font-medium text-gray-700">
          {Math.round(percentage)}%
        </span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {budgets.map((budget) => {
        const percentage = (budget.spent / budget.amount) * 100;
        const {
          color,
          icon: StatusIcon,
          text,
        } = getBudgetStatus(budget.spent, budget.amount);
        const { borderColor, bgColor } = getCardStyle(
          budget.spent,
          budget.amount
        );

        return (
          <div
            key={budget.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden border-2 ${borderColor}`}
          >
            <div
              className={`px-3 py-2 text-white flex justify-between items-center ${color.replace(
                "text-",
                "bg-"
              )}`}
            >
              <h3 className="text-base font-semibold truncate mr-2">
                {budget.category}
              </h3>
              <p className="text-xs opacity-90 whitespace-nowrap">
                {formatDate(budget.month)}
              </p>
            </div>
            <div className={`p-3 ${bgColor}`}>
              <div className="flex justify-between items-center mb-2">
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaMoneyBillWave className="mr-1 text-blue-500" />
                    <span>Budget: {formatCurrency(budget.amount)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaChartPie className="mr-1 text-red-500" />
                    <span>Spent: {formatCurrency(budget.spent)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaPiggyBank className="mr-1 text-green-500" />
                    <span>Remaining: {formatCurrency(budget.remaining)}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <CircularProgress percentage={percentage} color={color} />
                  <div className={`flex items-center mt-1 ${color}`}>
                    <StatusIcon className="mr-1" />
                    <span className="text-xs font-semibold">{text}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BudgetList;
