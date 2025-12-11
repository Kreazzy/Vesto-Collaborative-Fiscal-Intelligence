
import React, { useState } from 'react';
import { Search, Filter, ArrowUpRight, ArrowDownLeft, FileText, Edit2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatCurrency } from '../utils/currency';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../constants';
import { Transaction } from '../types';

export const Stats: React.FC = () => {
  const { transactions, currentUser, updateTransaction } = useStore();
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [search, setSearch] = useState('');

  const filtered = transactions.filter(t => {
    const matchesFilter = filter === 'all' || t.type === filter;
    const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase()) || 
                          t.category.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight italic uppercase">LEDGER</h2>
          <p className="text-gray-500 font-bold uppercase text-[10px] sm:text-xs tracking-widest mt-1">Global History</p>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['all', 'income', 'expense'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 sm:px-6 py-2 rounded-lg sm:rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-widest border transition-all flex-shrink-0 ${
                filter === f ? 'bg-primary border-primary text-background' : 'bg-surface border-white/5 text-gray-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
        <input 
          type="text"
          placeholder="Filter records..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-surface border-white/5 rounded-2xl sm:rounded-3xl pl-12 sm:pl-16 pr-6 py-3 sm:py-5 text-xs sm:text-sm font-bold focus:ring-primary focus:border-primary shadow-xl text-white"
        />
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-surface rounded-4xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5">
              <tr>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-500">Item</th>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-500">Category</th>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-500">Date</th>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-500 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-white/2 transition-colors cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${t.type === 'income' ? 'text-primary bg-primary/10' : 'text-red-500 bg-red-500/10'}`}>
                        {t.type === 'income' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                      </div>
                      <span className="font-black text-lg">{t.description}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest ${CATEGORY_COLORS[t.category]}`}>
                      {t.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-gray-500 font-bold text-sm">
                      {new Date(t.date).toLocaleDateString()}
                    </span>
                  </td>
                  <td className={`px-8 py-6 text-right font-black text-xl ${t.type === 'income' ? 'text-primary' : 'text-white'}`}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount, t.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card List View */}
      <div className="md:hidden flex flex-col gap-3">
        {filtered.map((t) => (
          <div key={t.id} className="bg-surface p-4 rounded-2xl border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${CATEGORY_COLORS[t.category]}`}>
                {CATEGORY_ICONS[t.category] || <FileText className="w-5 h-5" />}
              </div>
              <div className="flex flex-col">
                <span className="font-black text-sm">{t.description}</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase">{new Date(t.date).toLocaleDateString()}</span>
              </div>
            </div>
            <span className={`font-black text-base ${t.type === 'income' ? 'text-primary' : 'text-white'}`}>
              {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount, t.currency)}
            </span>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24 sm:py-32 opacity-20">
          <FileText className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4" />
          <p className="text-xl sm:text-2xl font-black italic">NO RECORDS</p>
        </div>
      )}
    </div>
  );
};
