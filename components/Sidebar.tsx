import React from 'react';
import { LayoutDashboard, Users, Settings, FileText, LogOut, Hexagon } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const menuItems = [
    { id: 'DASHBOARD', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'PROFILES', label: 'Profiles', icon: Users },
    { id: 'CONTENT', label: 'Reports', icon: FileText },
    { id: 'SETTINGS', label: 'Settings & API', icon: Settings },
  ];

  return (
    <div className="w-20 lg:w-64 bg-dark-800 h-screen fixed left-0 top-0 flex flex-col border-r border-dark-700 transition-all duration-300 z-50">
      <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-dark-700">
        <Hexagon className="text-brand-yellow w-8 h-8 fill-brand-yellow/20" />
        <span className="hidden lg:block ml-3 font-bold text-xl text-white tracking-tight">
          Insta<span className="text-brand-yellow">Tracker</span>
        </span>
      </div>

      <nav className="flex-1 py-8 flex flex-col gap-2 px-3">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id as ViewState)}
              className={`flex items-center p-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-dark-700 text-brand-yellow'
                  : 'text-gray-400 hover:bg-dark-700 hover:text-white'
              }`}
            >
              <item.icon
                className={`w-6 h-6 ${isActive ? 'text-brand-yellow' : 'text-gray-500 group-hover:text-white'}`}
              />
              <span className="hidden lg:block ml-4 font-medium tracking-tight">{item.label}</span>
              {isActive && (
                <div className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-brand-yellow shadow-[0_0_8px_#ffcd38]" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-dark-700">
        <button className="flex items-center w-full p-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-colors">
          <LogOut className="w-6 h-6" />
          <span className="hidden lg:block ml-4 font-medium tracking-tight">Logout</span>
        </button>
      </div>
    </div>
  );
};