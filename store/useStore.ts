
import { create } from 'zustand';
import { AppState, User, Transaction } from '../types';
import { mockDb } from '../db/mockDb';

interface AppActions {
  login: (user: User) => void;
  logout: () => void;
  register: (user: User) => void;
  addTransaction: (t: Transaction) => void;
  updateTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;
  updateUser: (u: User) => void;
  refreshData: () => void;
}

export const useStore = create<AppState & AppActions>((set, get) => ({
  currentUser: mockDb.getCurrentUser(),
  isAuthenticated: !!mockDb.getCurrentUser(),
  transactions: [],
  budgets: [],

  login: (user: User) => {
    mockDb.setCurrentUser(user);
    set({ currentUser: user, isAuthenticated: true });
    get().refreshData();
  },

  register: (user: User) => {
    mockDb.registerUser(user);
    get().login(user);
  },

  logout: () => {
    mockDb.setCurrentUser(null);
    set({ currentUser: null, isAuthenticated: false, transactions: [], budgets: [] });
  },

  addTransaction: (t: Transaction) => {
    mockDb.addTransaction(t);
    get().refreshData();
  },

  updateTransaction: (t: Transaction) => {
    mockDb.updateTransaction(t);
    get().refreshData();
  },

  deleteTransaction: (id: string) => {
    mockDb.deleteTransaction(id);
    get().refreshData();
  },

  updateUser: (u: User) => {
    mockDb.updateUser(u);
    set({ currentUser: u });
  },

  refreshData: () => {
    const user = get().currentUser;
    if (user) {
      set({
        transactions: mockDb.getTransactions(user.id),
        budgets: []
      });
    }
  }
}));
