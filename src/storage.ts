import type { Transaction, IStorage } from './types';

const STORAGE_KEY = 'kakeibo_transactions';

export class LocalStorageAdapter implements IStorage {
  getTransactions(): Transaction[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as Transaction[];
  }

  addTransaction(transaction: Transaction): void {
    const transactions = this.getTransactions();
    transactions.push(transaction);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }

  deleteTransaction(id: string): void {
    const transactions = this.getTransactions().filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }
}

export const storage: IStorage = new LocalStorageAdapter();
