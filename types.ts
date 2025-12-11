
export type Role = 'user' | 'admin';
export type Theme = 'dark' | 'light';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  password?: string;
  preferredCurrency: string;
  theme?: Theme;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  description: string;
  date: string;
  currency: string;
}

export interface Budget {
  id: string;
  userId: string;
  category: string;
  limit: number;
  spent: number;
  currency: string;
}

export interface AppState {
  currentUser: User | null;
  transactions: Transaction[];
  budgets: Budget[];
  isAuthenticated: boolean;
}
