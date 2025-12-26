import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, subValue, icon: Icon, trend, color = "text-brand-yellow" }) => {
  return (
    <div className="bg-dark-800 p-6 rounded-2xl border border-dark-700 hover:border-dark-600 transition-colors shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1 tracking-normal">{label}</p>
          <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl bg-dark-700 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {subValue && (
        <div className="flex items-center text-sm">
            {trend === 'up' && <span className="text-green-500 font-medium mr-2">↑</span>}
            {trend === 'down' && <span className="text-red-500 font-medium mr-2">↓</span>}
          <span className="text-gray-500 tracking-tight">{subValue}</span>
        </div>
      )}
    </div>
  );
};