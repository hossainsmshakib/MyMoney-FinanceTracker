import { api } from "./api";
import { Transaction } from "../types/Transaction";
import { Budget } from "../types/Budget";
import { DashboardData } from "../types/Dashboard";

export const fetchDashboardDataService = async (): Promise<DashboardData> => {
  try {
    const [transactionsResponse, budgetsResponse] = await Promise.all([
      api.get<Transaction[]>("/transactions"),
      api.get<Budget[]>("/budgets"),
    ]);

    const transactions: Transaction[] = transactionsResponse.data;
    const budgets: Budget[] = budgetsResponse.data;

    const totalIncome = transactions
      .filter((t: Transaction) => t.type === "income")
      .reduce(
        (sum: number, t: Transaction) => sum + parseFloat(t.amount.toString()),
        0
      );

    const totalExpenses = transactions
      .filter((t: Transaction) => t.type === "expense")
      .reduce(
        (sum: number, t: Transaction) => sum + parseFloat(t.amount.toString()),
        0
      );

    const remainingBalance = totalIncome - totalExpenses;

    const categoryExpenses = transactions
      .filter((t: Transaction) => t.type === "expense")
      .reduce((acc: Record<string, number>, t: Transaction) => {
        const category = t.category.toLowerCase();
        acc[category] = (acc[category] || 0) + parseFloat(t.amount.toString());
        return acc;
      }, {} as Record<string, number>);

    const monthlyTrends = transactions.reduce(
      (
        acc: Record<string, { income: number; expenses: number }>,
        t: Transaction
      ) => {
        const month = t.date.substring(0, 7); // Extract YYYY-MM
        if (!acc[month]) {
          acc[month] = { income: 0, expenses: 0 };
        }
        if (t.type === "income") {
          acc[month].income += parseFloat(t.amount.toString());
        } else {
          acc[month].expenses += parseFloat(t.amount.toString());
        }
        return acc;
      },
      {} as Record<string, { income: number; expenses: number }>
    );

    const budgetComparison = budgets.map((budget: Budget) => {
      const spent = categoryExpenses[budget.category.toLowerCase()] || 0;
      return {
        category: budget.category,
        budgeted: budget.amount,
        spent: spent,
      };
    });

    return {
      summary: {
        totalIncome,
        totalExpenses,
        remainingBalance,
      },
      categoryExpenses: Object.entries(categoryExpenses).map(
        ([category, amount]) => ({ category, amount: amount as number })
      ),
      monthlyTrends: Object.entries(monthlyTrends).map(([month, data]) => ({
        month,
        income: data.income,
        expenses: data.expenses,
      })),
      budgetComparison,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};
