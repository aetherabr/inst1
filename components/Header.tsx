import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <header className="h-20 bg-dark-800/50 backdrop-blur-md border-b border-dark-700 flex items-center justify-between px-8 sticky top-0 z-40">
      <h1 className="text-xl font-bold text-white tracking-tight">{title}</h1>
      
      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-dark-900 border border-dark-700 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/50 transition-all w-64 placeholder:text-gray-600"
          />
        </div>

        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-dark-700">
            <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-white tracking-tight">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center border border-dark-600 text-brand-yellow">
                <User className="w-5 h-5" />
            </div>
        </div>
      </div>
    </header>
  );
};