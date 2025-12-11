
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, TrendingUp, Plus, X, ArrowDownCircle, ArrowUpCircle, Edit3, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatCurrency } from '../utils/currency';
import { CATEGORY_ICONS, CATEGORY_COLORS } from '../constants';
import { Transaction } from '../types';

export const Dashboard: React.FC = () => {
  const { currentUser, transactions, addTransaction, updateTransaction, deleteTransaction } = useStore();
  const [showModal, setShowModal] = useState<'income' | 'expense' | null>(null);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const MotionDiv = motion.div as any;

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const amount = parseFloat(formData.get('amount') as string);
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;

    if (!amount || !description) return;

    if (editingTransaction) {
      updateTransaction({
        ...editingTransaction,
        amount,
        description,
        category,
      });
      setEditingTransaction(null);
    } else {
      const newTransaction: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        userId: currentUser?.id || '',
        amount,
        description,
        category: category || 'Other',
        type: showModal as 'income' | 'expense',
        date: new Date().toISOString(),
        currency: currentUser?.preferredCurrency || 'USD'
      };
      addTransaction(newTransaction);
      setShowModal(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Welcome Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={currentUser?.avatar} className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl ring-2 ring-primary/20" alt="" />
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Hi, {currentUser?.name}</h2>
            <p className="text-gray-500 text-xs sm:text-sm font-medium">Your fiscal status today.</p>
          </div>
        </div>
        <div className="text-right flex flex-col items-start sm:items-end">
          <span className="text-primary font-black tracking-widest text-xs uppercase">
            {currentTime.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
          <span className="text-white font-bold text-lg sm:text-xl tabular-nums">
            {currentTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </header>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 relative overflow-hidden rounded-3xl sm:rounded-4xl bg-surface border border-white/5 shadow-xl p-6 sm:p-8 flex flex-col justify-between min-h-[180px] sm:min-h-[220px]">
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-primary/5 rounded-full blur-3xl -mr-12 -mt-12 sm:-mr-20 sm:-mt-20"></div>
          <div className="relative z-10">
            <p className="text-gray-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-1">Current Balance</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter">
              {formatCurrency(balance, currentUser?.preferredCurrency)}
            </h1>
          </div>
          <div className="flex gap-3 sm:gap-4 relative z-10 mt-6 sm:mt-8">
            <button 
              onClick={() => setShowModal('income')}
              className="flex-1 flex items-center justify-center gap-2 h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-primary text-background font-black text-xs sm:text-sm shadow-neon hover:scale-[1.02] transition-all active:scale-95"
            >
              <ArrowUpCircle className="w-4 h-4 sm:w-5 sm:h-5" /> INCOME
            </button>
            <button 
              onClick={() => setShowModal('expense')}
              className="flex-1 flex items-center justify-center gap-2 h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs sm:text-sm hover:bg-white/10 transition-all active:scale-95"
            >
              <ArrowDownCircle className="w-4 h-4 sm:w-5 sm:h-5" /> EXPENSE
            </button>
          </div>
        </section>

        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
           <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-surface border border-white/5 flex items-center gap-3 sm:gap-4">
              <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-lg sm:rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <p className="text-[9px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest">In</p>
                <p className="text-sm sm:text-xl font-black text-white truncate">{formatCurrency(totalIncome, currentUser?.preferredCurrency)}</p>
              </div>
           </div>
           <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-surface border border-white/5 flex items-center gap-3 sm:gap-4">
              <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-lg sm:rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                <ArrowDownCircle className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <p className="text-[9px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest">Out</p>
                <p className="text-sm sm:text-xl font-black text-white truncate">{formatCurrency(totalExpense, currentUser?.preferredCurrency)}</p>
              </div>
           </div>
        </div>
      </div>

      <section className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-black tracking-tight uppercase italic">Recent Activity</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {transactions.slice(0, 6).map((t) => (
            <div 
              key={t.id} 
              onClick={() => setEditingTransaction(t)}
              className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-surface border border-white/5 hover:border-primary/40 transition-all cursor-pointer overflow-hidden"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`h-10 w-10 sm:h-14 sm:w-14 rounded-lg sm:rounded-2xl flex items-center justify-center ${CATEGORY_COLORS[t.category] || 'bg-gray-500/10 text-gray-500'}`}>
                  {CATEGORY_ICONS[t.category] || <Plus className="w-5 h-5 sm:w-6 sm:h-6" />}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm sm:text-lg font-black leading-tight">{t.description}</span>
                  <span className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wide">{t.category} • {new Date(t.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-sm sm:text-xl font-black ${t.type === 'income' ? 'text-primary' : 'text-white'}`}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount, t.currency)}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                  <Edit3 className="w-3 h-3 text-primary" />
                </div>
              </div>
            </div>
          ))}
          {transactions.length === 0 && (
            <div className="md:col-span-2 text-center py-16 sm:py-20 bg-surface/30 rounded-3xl sm:rounded-4xl border border-dashed border-white/10 opacity-30">
              <p className="font-bold text-xs sm:text-base italic">EMPTY LEDGER</p>
            </div>
          )}
        </div>
      </section>

      {/* Unified Modal */}
      <AnimatePresence>
        {(showModal || editingTransaction) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-md">
            <MotionDiv
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-surface border border-white/10 rounded-3xl sm:rounded-4xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-3xl font-black uppercase italic tracking-tighter">
                    {editingTransaction ? 'Edit' : 'Add'} <span className={(editingTransaction?.type || showModal) === 'income' ? 'text-primary' : 'text-red-500'}>{editingTransaction?.type || showModal}</span>
                  </h3>
                  <div className="flex items-center gap-2">
                    {editingTransaction && (
                      <button 
                        onClick={() => {
                          if(confirm('Delete?')) deleteTransaction(editingTransaction.id);
                          setEditingTransaction(null);
                        }}
                        className="p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                    )}
                    <button onClick={() => {setShowModal(null); setEditingTransaction(null);}} className="p-2 rounded-full hover:bg-white/5 text-gray-500 transition-colors">
                      <X className="w-6 h-6 sm:w-8 sm:h-8" />
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase">Amount ({currentUser?.preferredCurrency})</label>
                    <input 
                      name="amount" 
                      type="number" 
                      step="0.01" 
                      required 
                      defaultValue={editingTransaction?.amount}
                      autoFocus
                      className="w-full bg-surface-light border-white/10 rounded-xl sm:rounded-2xl py-3 sm:py-4 px-4 sm:px-6 text-xl sm:text-2xl font-black text-white focus:ring-primary focus:border-primary" 
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase">Description</label>
                    <input 
                      name="description" 
                      type="text" 
                      required 
                      defaultValue={editingTransaction?.description}
                      className="w-full bg-surface-light border-white/10 rounded-xl sm:rounded-2xl py-3 sm:py-4 px-4 sm:px-6 font-bold text-sm sm:text-base focus:ring-primary focus:border-primary" 
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase">Category</label>
                    <select 
                      name="category" 
                      defaultValue={editingTransaction?.category || 'Other'}
                      className="w-full bg-surface-light border-white/10 rounded-xl sm:rounded-2xl py-3 sm:py-4 px-4 sm:px-6 font-bold text-sm sm:text-base focus:ring-primary focus:border-primary"
                    >
                      {Object.keys(CATEGORY_ICONS).map(cat => (
                        <option key={cat} value={cat} className="bg-surface">{cat}</option>
                      ))}
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    className={`w-full h-12 sm:h-16 rounded-xl sm:rounded-2xl font-black text-sm sm:text-xl transition-all shadow-lg ${(editingTransaction?.type || showModal) === 'income' ? 'bg-primary text-background' : 'bg-red-500 text-white'}`}
                  >
                    {editingTransaction ? 'SAVE CHANGES' : `CONFIRM ${showModal?.toUpperCase()}`}
                  </button>
                </form>
              </div>
            </MotionDiv>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
