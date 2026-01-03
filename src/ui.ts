import type { Transaction, TransactionType } from './types';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from './types';

export function updateCategoryOptions(type: TransactionType): void {
  const categorySelect = document.getElementById('category') as HTMLSelectElement;
  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  categorySelect.innerHTML = categories
    .map(cat => `<option value="${cat}">${cat}</option>`)
    .join('');
}

export function renderTransactions(
  transactions: Transaction[],
  onDelete: (id: string) => void
): void {
  const container = document.getElementById('transaction-list')!;

  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (sorted.length === 0) {
    container.innerHTML = '<p class="text-gray-500 text-center py-8">取引がありません</p>';
    return;
  }

  container.innerHTML = sorted
    .map(t => `
      <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100">
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <span class="px-2 py-1 text-xs rounded ${
              t.type === 'income'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }">
              ${t.type === 'income' ? '収入' : '支出'}
            </span>
            <span class="text-sm text-gray-500">${t.date}</span>
            <span class="text-sm text-gray-600">${t.category}</span>
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-lg font-semibold ${
              t.type === 'income' ? 'text-green-600' : 'text-red-600'
            }">
              ${t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}円
            </span>
            ${t.memo ? `<span class="text-sm text-gray-500">${t.memo}</span>` : ''}
          </div>
        </div>
        <button
          data-delete-id="${t.id}"
          class="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
          title="削除"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    `)
    .join('');

  container.querySelectorAll('[data-delete-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = (btn as HTMLElement).dataset.deleteId!;
      if (confirm('この取引を削除しますか？')) {
        onDelete(id);
      }
    });
  });
}

export function renderBalance(transactions: Transaction[]): void {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  document.getElementById('total-income')!.textContent = `+${income.toLocaleString()}円`;
  document.getElementById('total-expense')!.textContent = `-${expense.toLocaleString()}円`;

  const balanceEl = document.getElementById('balance')!;
  balanceEl.textContent = `${balance >= 0 ? '+' : ''}${balance.toLocaleString()}円`;
  balanceEl.className = balance >= 0 ? 'text-3xl font-bold text-green-600' : 'text-3xl font-bold text-red-600';
}

export function getFormData(): Omit<Transaction, 'id' | 'createdAt'> | null {
  const type = (document.getElementById('type') as HTMLSelectElement).value as TransactionType;
  const amount = parseInt((document.getElementById('amount') as HTMLInputElement).value, 10);
  const category = (document.getElementById('category') as HTMLSelectElement).value;
  const date = (document.getElementById('date') as HTMLInputElement).value;
  const memo = (document.getElementById('memo') as HTMLInputElement).value;

  if (!amount || amount <= 0 || !date) {
    alert('金額と日付を入力してください');
    return null;
  }

  return { type, amount, category, date, memo };
}

export function resetForm(): void {
  (document.getElementById('amount') as HTMLInputElement).value = '';
  (document.getElementById('memo') as HTMLInputElement).value = '';
}
