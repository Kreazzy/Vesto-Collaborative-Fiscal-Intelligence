
import React, { useState } from 'react';
import { Shield, Trash2, Key, Search, UserMinus } from 'lucide-react';
import { mockDb } from '../db/mockDb';
import { User } from '../types';

export const AdminPortal: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockDb.getUsers());
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      const updated = mockDb.deleteUser(id);
      setUsers(updated);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Admin Portal</h2>
          <p className="text-xs text-gray-500">System management and user moderation</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-surface border border-white/5">
          <p className="text-xs text-gray-500 font-bold uppercase mb-1">Total Users</p>
          <p className="text-3xl font-extrabold text-primary">{users.length}</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface border border-white/5">
          <p className="text-xs text-gray-500 font-bold uppercase mb-1">Active Now</p>
          <p className="text-3xl font-extrabold text-white">1</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input 
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-surface border-white/5 rounded-xl pl-12 text-sm focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-bold px-1">User Directory</h3>
        {filteredUsers.map(user => (
          <div key={user.id} className="p-4 rounded-2xl bg-surface border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={user.avatar} className="w-10 h-10 rounded-full bg-surface-light" alt="" />
              <div className="flex flex-col">
                <span className="font-bold text-sm">{user.name}</span>
                <span className="text-xs text-gray-500">{user.email}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                title="Reset Password"
                className="p-2 rounded-lg bg-surface-light text-gray-400 hover:text-primary transition-colors"
              >
                <Key className="w-4 h-4" />
              </button>
              {user.role !== 'admin' && (
                <button 
                  onClick={() => handleDelete(user.id)}
                  title="Delete User"
                  className="p-2 rounded-lg bg-surface-light text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
        {filteredUsers.length === 0 && (
          <div className="text-center py-10 opacity-40">
            <UserMinus className="w-12 h-12 mx-auto mb-2" />
            <p>No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};
