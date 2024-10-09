export interface DashboardData {
  summary: {
    totalIncome: number;
    totalExpenses: number;
    remainingBalance: number;
  };
  categoryExpenses: Array<{
    category: string;
    amount: number;
  }>;
  monthlyTrends: Array<{
    month: string;
    income: number;
    expenses: number;
  }>;
  budgetComparison: Array<{
    category: string;
    budgeted: number;
    spent: number;
  }>;
}
