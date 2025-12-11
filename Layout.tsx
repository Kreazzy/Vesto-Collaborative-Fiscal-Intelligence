
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutGrid, 
  BarChart3, 
  User as UserIcon, 
  Plus,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import { useStore } from './store/useStore';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const { currentUser, logout } = useStore();
  const MotionDiv = motion.div as any;

  const navItems = [
    { id: 'dashboard', icon: <LayoutGrid />, label: 'Dashboard' },
    { id: 'stats', icon: <BarChart3 />, label: 'Transactions' },
    { id: 'profile', icon: <UserIcon />, label: 'Profile' },
  ];

  if (currentUser?.role === 'admin') {
    navItems.splice(2, 0, { id: 'admin', icon: <ShieldCheck />, label: 'Admin' });
  }

  return (
    <div className={`relative flex flex-col min-h-screen bg-background transition-colors duration-300`}>
      {/* Desktop Header */}
      <header className="hidden md:flex items-center justify-between px-10 py-6 border-b border-white/5 bg-surface/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-neon">
            <span className="font-black text-background text-xl">V</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">VESTO</h1>
        </div>
        
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 transition-all font-bold ${
                activeTab === item.id ? 'text-primary' : 'text-gray-500 hover:text-white'
              }`}
            >
              <span className="w-5 h-5">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-red-500 hover:text-red-400 font-bold ml-4 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Exit</span>
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex justify-center w-full px-4 md:px-10 py-6">
        <div className="w-full max-w-6xl">
          <AnimatePresence mode="wait">
            <MotionDiv
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="pb-24 md:pb-6"
            >
              {children}
            </MotionDiv>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Footer Branding (Always visible above nav) */}
      <div className="md:hidden fixed bottom-24 left-0 right-0 flex justify-center pointer-events-none opacity-40 z-40">
        <span className="text-[9px] font-black tracking-[0.3em] uppercase text-white/60">
          Crafted by Cordulatech
        </span>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="h-12 bg-gradient-to-t from-background to-transparent w-full absolute -top-12 pointer-events-none"></div>
        <div className="bg-[#152019]/95 backdrop-blur-xl border-t border-white/5 px-6 pt-4 pb-8 flex justify-between items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 transition-all ${
                activeTab === item.id ? 'text-primary scale-110' : 'text-gray-500'
              }`}
            >
              <span className="w-6 h-6">{item.icon}</span>
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop Footer Branding */}
      <footer className="hidden md:flex py-8 justify-center opacity-30">
        <a href="https://cordulatech.com" target="_blank" className="text-xs font-bold tracking-widest uppercase hover:text-primary transition-colors">
          Designed by Cordulatech
        </a>
      </footer>
    </div>
  );
};
