import type { Transaction, TransactionType } from './types';
import { storage } from './storage';
import { updateCategoryOptions, renderTransactions, renderBalance, getFormData, resetForm } from './ui';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function refresh(): void {
  const transactions = storage.getTransactions();
  renderTransactions(transactions, handleDelete);
  renderBalance(transactions);
}

function handleDelete(id: string): void {
  storage.deleteTransaction(id);
  refresh();
}

function handleSubmit(e: Event): void {
  e.preventDefault();

  const data = getFormData();
  if (!data) return;

  const transaction: Transaction = {
    ...data,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };

  storage.addTransaction(transaction);
  resetForm();
  refresh();
}

function handleTypeChange(e: Event): void {
  const type = (e.target as HTMLSelectElement).value as TransactionType;
  updateCategoryOptions(type);
}

function init(): void {
  const form = document.getElementById('transaction-form')!;
  const typeSelect = document.getElementById('type')!;
  const dateInput = document.getElementById('date') as HTMLInputElement;

  dateInput.value = new Date().toISOString().split('T')[0];

  updateCategoryOptions('expense');

  form.addEventListener('submit', handleSubmit);
  typeSelect.addEventListener('change', handleTypeChange);

  refresh();
}

document.addEventListener('DOMContentLoaded', init);
