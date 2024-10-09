export interface Budget {
  id: string;
  userId: string;
  category: string;
  amount: number;
  month: string;
}

export interface BudgetStatus extends Budget {
  spent: number;
  remaining: number;
}
