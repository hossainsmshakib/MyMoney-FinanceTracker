export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  date: string;
  description: string;
}

export interface AddTransactionPayload {
  amount: number;
  category: string;
  type: "income" | "expense";
  date: string;
  description: string;
}

export interface EditTransactionPayload extends AddTransactionPayload {
  id: string;
}
