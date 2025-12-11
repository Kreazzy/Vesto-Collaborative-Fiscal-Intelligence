
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Lock, User as UserIcon } from 'lucide-react';
import { FinanceHero3D } from '../components/Visuals/FinanceHero3D';
import { useStore } from '../store/useStore';
import { mockDb } from '../db/mockDb';

export const Auth: React.FC = () => {
  const { login, register } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const MotionDiv = motion.div as any;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      const users = mockDb.getUsers();
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        login(user);
      } else {
        alert('Invalid credentials.');
      }
    } else {
      if (!username || !email || !password) return;
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: username,
        email,
        password,
        role: 'user' as const,
        avatar: `https://picsum.photos/seed/${username}/200`,
        preferredCurrency: 'USD' as const
      };
      register(newUser);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden bg-background">
      <FinanceHero3D />

      <MotionDiv 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm z-10"
      >
        <div className="text-center mb-8 sm:mb-10">
          <MotionDiv 
            animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 5 : 0 }}
            className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-neon"
          >
            <span className="text-3xl font-black text-background">V</span>
          </MotionDiv>
          <h1 className="text-4xl font-black tracking-tight mb-2 italic">VESTO</h1>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </p>
        </div>

        <div className="bg-surface/40 backdrop-blur-xl border border-white/5 p-6 sm:p-8 rounded-[2.5rem] shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <MotionDiv
                  key="username"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative group overflow-hidden"
                >
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors w-5 h-5" />
                  <input 
                    type="text"
                    required
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white/5 border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:ring-primary focus:border-primary transition-all text-white"
                  />
                </MotionDiv>
              )}
            </AnimatePresence>

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors w-5 h-5" />
              <input 
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:ring-primary focus:border-primary transition-all text-white"
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors w-5 h-5" />
              <input 
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:ring-primary focus:border-primary transition-all text-white"
              />
            </div>

            <button 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-full bg-primary text-background font-black py-4 rounded-2xl shadow-neon flex items-center justify-center gap-2 hover:scale-[1.02] transition-all active:scale-95 text-sm sm:text-base"
            >
              {isLogin ? 'SIGN IN' : 'SIGN UP'} <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </div>

        <p className="text-center mt-12 text-[10px] font-black tracking-widest text-gray-600 uppercase">
          A CORDULATECH PRODUCT
        </p>
      </MotionDiv>
    </div>
  );
};
