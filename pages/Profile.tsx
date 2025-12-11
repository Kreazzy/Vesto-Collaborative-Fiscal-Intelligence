
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  User as UserIcon, 
  Lock, 
  ImageIcon, 
  Coins, 
  CheckCircle, 
  Upload, 
  Mail, 
  Moon, 
  Sun, 
  Info,
  LogOut
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { ALL_CURRENCIES } from '../constants';

export const Profile: React.FC = () => {
  const { currentUser, updateUser, logout } = useStore();
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');
  const [password, setPassword] = useState('');
  const [currency, setCurrency] = useState(currentUser?.preferredCurrency || 'USD');
  const [theme, setTheme] = useState(currentUser?.theme || 'dark');
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Apply theme class to html element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = '#102216';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.backgroundColor = '#f8fafc';
    }
  }, [theme]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    updateUser({
      ...currentUser,
      name,
      email,
      avatar,
      preferredCurrency: currency,
      theme,
      ...(password ? { password } : {})
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      {/* Header & Mobile LogOut */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative group">
            <img src={avatar} className="w-20 h-20 sm:w-28 sm:h-28 rounded-3xl border-4 border-primary shadow-neon object-cover" alt="" />
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl"
            >
              <Upload className="text-primary w-8 h-8" />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              className="hidden" 
              accept="image/*" 
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-4xl font-black italic tracking-tight text-white dark:text-white light:text-slate-900 truncate max-w-[150px] sm:max-w-none">
              {currentUser?.name}
            </h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[9px] sm:text-xs mt-1">Vesto Elite Status</p>
          </div>
        </div>
        
        {/* Mobile LogOut Button */}
        <button 
          onClick={logout}
          className="md:hidden flex items-center gap-2 bg-red-500/10 text-red-500 p-3 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-xs font-black uppercase tracking-widest">Exit</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 pb-20 sm:pb-0">
        {/* Personal Info Section */}
        <section className="bg-surface dark:bg-surface light:bg-white rounded-3xl sm:rounded-4xl border border-white/5 light:border-slate-200 p-6 sm:p-8 space-y-6 sm:space-y-8 shadow-xl">
          <div className="flex items-center gap-3 text-primary mb-2">
            <UserIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight">Personal Info</h3>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-1 sm:space-y-2">
              <label className="text-[10px] sm:text-xs font-black text-gray-500 uppercase tracking-widest">Display Name</label>
              <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 light:bg-slate-100 border-white/10 light:border-slate-300 rounded-xl sm:rounded-2xl py-3 sm:py-4 px-4 sm:px-6 font-bold text-sm sm:text-base focus:ring-primary focus:border-primary text-white light:text-slate-900"
              />
            </div>
            
            <div className="space-y-1 sm:space-y-2">
              <label className="text-[10px] sm:text-xs font-black text-gray-500 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 light:bg-slate-100 border-white/10 light:border-slate-300 rounded-xl sm:rounded-2xl py-3 pl-14 sm:pl-16 pr-6 font-bold text-sm sm:text-base focus:ring-primary focus:border-primary text-white light:text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <label className="text-[10px] sm:text-xs font-black text-gray-500 uppercase tracking-widest">Update Password</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
                <input 
                  type="password"
                  placeholder="Keep blank to keep current"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 light:bg-slate-100 border-white/10 light:border-slate-300 rounded-xl sm:rounded-2xl py-3 pl-14 sm:pl-16 pr-6 font-bold text-sm sm:text-base focus:ring-primary focus:border-primary text-white light:text-slate-900"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="bg-surface dark:bg-surface light:bg-white rounded-3xl sm:rounded-4xl border border-white/5 light:border-slate-200 p-6 sm:p-8 space-y-6 sm:space-y-8 shadow-xl">
          <div className="flex items-center gap-3 text-primary mb-2">
            <Coins className="w-5 h-5 sm:w-6 sm:h-6" />
            <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight">Preferences</h3>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-1 sm:space-y-2">
              <label className="text-[10px] sm:text-xs font-black text-gray-500 uppercase tracking-widest">Base Currency</label>
              <select 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-[#1c2e21] light:bg-slate-100 border-white/10 light:border-slate-300 rounded-xl sm:rounded-2xl py-3 sm:py-4 px-4 sm:px-6 font-bold text-sm sm:text-base focus:ring-primary focus:border-primary text-white light:text-slate-900 appearance-none cursor-pointer"
              >
                {ALL_CURRENCIES.map((curr) => (
                  <option key={curr.code} value={curr.code} className="bg-surface text-white">
                    {curr.code} - {curr.name} ({curr.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <label className="text-[10px] sm:text-xs font-black text-gray-500 uppercase tracking-widest">Interface Theme</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-black transition-all ${
                    theme === 'dark' ? 'bg-primary text-background' : 'bg-white/5 light:bg-slate-100 text-gray-500'
                  }`}
                >
                  <Moon className="w-5 h-5" /> DARK
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-black transition-all ${
                    theme === 'light' ? 'bg-primary text-background' : 'bg-white/5 light:bg-slate-100 text-gray-500'
                  }`}
                >
                  <Sun className="w-5 h-5" /> LIGHT
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-surface dark:bg-surface light:bg-white rounded-3xl sm:rounded-4xl border border-white/5 light:border-slate-200 p-6 sm:p-8 space-y-4 shadow-xl lg:col-span-1">
          <div className="flex items-center gap-3 text-primary mb-2">
            <Info className="w-5 h-5 sm:w-6 sm:h-6" />
            <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight">About Vesto</h3>
          </div>
          <div className="space-y-2 text-xs sm:text-sm font-bold">
            <p className="text-white light:text-slate-900 flex justify-between">
              <span className="text-gray-500">App Name</span>
              <span>VESTO Fiscal Tracker</span>
            </p>
            <p className="text-white light:text-slate-900 flex justify-between">
              <span className="text-gray-500">Version</span>
              <span className="text-primary tracking-widest">2.1.1</span>
            </p>
            <p className="text-white light:text-slate-900 flex justify-between">
              <span className="text-gray-500">Developer</span>
              <span>CORDULATECH</span>
            </p>
            <div className="pt-4 border-t border-white/5 light:border-slate-100 text-center text-[10px] text-gray-600 uppercase tracking-[0.2em]">
              Precision Fiscal Intelligence
            </div>
          </div>
        </section>

        {/* Save Controls */}
        <div className="lg:col-span-1 flex flex-col justify-end">
          <div className="flex items-center gap-4">
            <button 
              type="submit"
              className="flex-1 h-14 sm:h-16 bg-primary text-background rounded-xl sm:rounded-2xl font-black text-sm sm:text-lg shadow-neon flex items-center justify-center gap-2 hover:scale-[1.02] transition-all active:scale-95"
            >
              <Save className="w-5 h-5 sm:w-6 sm:h-6" /> COMMIT UPDATES
            </button>
            {saved && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm"
              >
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> SUCCESS
              </motion.div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
