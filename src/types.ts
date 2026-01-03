export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  date: string;
  memo: string;
  createdAt: string;
}

export const INCOME_CATEGORIES = ['給料', '副業', '投資', 'その他'] as const;
export const EXPENSE_CATEGORIES = ['食費', '住居費', '交通費', '娯楽', '日用品', 'その他'] as const;

export interface IStorage {
  getTransactions(): Transaction[];
  addTransaction(transaction: Transaction): void;
  deleteTransaction(id: string): void;
}
