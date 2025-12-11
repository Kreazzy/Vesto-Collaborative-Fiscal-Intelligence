
import { User, Transaction } from '../types';

const STORAGE_KEYS = {
  USERS: 'vesto_users',
  TRANSACTIONS: 'vesto_transactions',
  AUTH: 'vesto_auth_user'
};

const INITIAL_USERS: User[] = [
  { id: 'u1', name: 'Alex Morgan', email: 'alex@cordulatech.com', role: 'user', avatar: 'https://picsum.photos/seed/alex/200', preferredCurrency: 'USD', password: 'password123' }
];

export const mockDb = {
  init: () => {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)) {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify([]));
    }
  },

  getUsers: (): User[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]'),
  
  registerUser: (newUser: User) => {
    const users = mockDb.getUsers();
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  updateUser: (updatedUser: User) => {
    const users = mockDb.getUsers();
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index > -1) {
      users[index] = updatedUser;
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      mockDb.setCurrentUser(updatedUser);
    }
  },

  // Added deleteUser method to resolve reference error in AdminPortal.tsx
  deleteUser: (id: string): User[] => {
    const users = mockDb.getUsers();
    const filtered = users.filter(u => u.id !== id);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filtered));
    return filtered;
  },

  getTransactions: (userId: string): Transaction[] => {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.TRANSACTIONS) || '[]');
    return all.filter((t: Transaction) => t.userId === userId);
  },

  addTransaction: (transaction: Transaction) => {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.TRANSACTIONS) || '[]');
    all.unshift(transaction);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(all));
  },

  updateTransaction: (updated: Transaction) => {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.TRANSACTIONS) || '[]');
    const index = all.findIndex(t => t.id === updated.id);
    if (index > -1) {
      all[index] = updated;
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(all));
    }
  },

  deleteTransaction: (id: string) => {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.TRANSACTIONS) || '[]');
    const filtered = all.filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(filtered));
  },

  getCurrentUser: (): User | null => JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTH) || 'null'),
  setCurrentUser: (user: User | null) => localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(user))
};
