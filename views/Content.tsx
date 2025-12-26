import React, { useState } from 'react';
import { Filter, Download, Calendar, Database, CheckCircle, AlertOctagon, ArrowUpDown, Pencil, Trash2, MoreVertical } from 'lucide-react';
import { MOCK_EXTRACTION_HISTORY } from '../constants';

export const Content: React.FC = () => {
  const [period, setPeriod] = useState('Daily');
  const [categoryFilter, setCategoryFilter] = useState('All');

  return (
    <div className="p-8 space-y-8">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Extraction Reports</h2>
          <p className="text-gray-400 mt-1 tracking-tight">Detailed logs and analytics of content collection performance.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
            <div className="bg-dark-800 border border-dark-700 rounded-lg p-1 flex items-center">
                {['Daily', 'Weekly', 'Monthly'].map((p) => (
                    <button 
                        key={p}
                        onClick={() => setPeriod(p)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                            period === p 
                            ? 'bg-brand-yellow text-dark-900 shadow-sm' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        {p}
                    </button>
                ))}
            </div>

            <button className="bg-dark-800 text-white px-4 py-2 rounded-lg border border-dark-700 hover:bg-dark-700 flex items-center gap-2 text-sm font-medium transition-colors">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Custom Range</span>
            </button>

            <button className="bg-dark-800 text-white px-4 py-2 rounded-lg border border-dark-700 hover:bg-dark-700 flex items-center gap-2 text-sm font-medium transition-colors">
                <Download className="w-4 h-4 text-gray-400" />
                <span>Export CSV</span>
            </button>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <div className="flex items-center gap-4 mb-2">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                    <Database className="w-5 h-5" />
                </div>
                <h3 className="text-gray-400 text-sm font-medium tracking-wide uppercase">Volume (Period)</h3>
            </div>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-white tracking-tight">2,450</span>
                <span className="text-sm text-gray-500 mb-1">items collected</span>
            </div>
        </div>

        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <div className="flex items-center gap-4 mb-2">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                    <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="text-gray-400 text-sm font-medium tracking-wide uppercase">Success Rate</h3>
            </div>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-white tracking-tight">98.5%</span>
                <span className="text-sm text-green-500 mb-1">↑ 0.2%</span>
            </div>
        </div>

        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
             <div className="flex items-center gap-4 mb-2">
                <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                    <AlertOctagon className="w-5 h-5" />
                </div>
                <h3 className="text-gray-400 text-sm font-medium tracking-wide uppercase">Fallback Usage</h3>
            </div>
             <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-white tracking-tight">12</span>
                <span className="text-sm text-gray-500 mb-1">events triggered</span>
            </div>
        </div>
      </div>

      {/* Detailed Table - Updated with Subtle Vertical Lines */}
      <div className="bg-dark-900 border border-dark-700 rounded-lg overflow-hidden flex flex-col">
        <div className="p-4 border-b border-dark-700 flex flex-col sm:flex-row justify-between items-center gap-4 bg-dark-800/30">
            <h3 className="text-base font-semibold text-white tracking-tight">Extraction History</h3>
            
            <div className="flex items-center gap-3">
                <div className="relative">
                    <Filter className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select 
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="bg-dark-900 border border-dark-700 rounded-md pl-9 pr-8 py-1.5 text-sm text-white appearance-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none cursor-pointer hover:bg-dark-800 transition-colors"
                    >
                        <option value="All">All Categories</option>
                        <option value="STORY">Stories Only</option>
                        <option value="POST">Posts Only</option>
                    </select>
                </div>
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-dark-800/50 border-b border-dark-700">
                    <tr>
                        <th className="w-12 px-4 py-3 text-center border-r border-dark-800 last:border-r-0">
                             <div className="w-4 h-4 rounded border border-dark-600 mx-auto hover:border-gray-400 transition-colors cursor-pointer"></div>
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white group transition-colors border-r border-dark-800 last:border-r-0">
                            <div className="flex items-center gap-2">Date & Time <ArrowUpDown className="w-3 h-3 text-dark-600 group-hover:text-gray-400" /></div>
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white group transition-colors border-r border-dark-800 last:border-r-0">
                            <div className="flex items-center gap-2">Profile <ArrowUpDown className="w-3 h-3 text-dark-600 group-hover:text-gray-400" /></div>
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white group transition-colors border-r border-dark-800 last:border-r-0">
                            <div className="flex items-center gap-2">Category <ArrowUpDown className="w-3 h-3 text-dark-600 group-hover:text-gray-400" /></div>
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider text-right cursor-pointer hover:text-white group transition-colors border-r border-dark-800 last:border-r-0">
                             <div className="flex items-center justify-end gap-2">Items <ArrowUpDown className="w-3 h-3 text-dark-600 group-hover:text-gray-400" /></div>
                        </th>
                         <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider text-right border-r border-dark-800 last:border-r-0">Size</th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider border-r border-dark-800 last:border-r-0">API Provider</th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider border-r border-dark-800 last:border-r-0">Status</th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider text-right border-r border-dark-800 last:border-r-0">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-dark-800">
                    {MOCK_EXTRACTION_HISTORY
                        .filter(item => categoryFilter === 'All' || item.type === categoryFilter)
                        .map((row) => (
                        <tr key={row.id} className="bg-dark-900 hover:bg-dark-800/50 transition-colors group h-16">
                            <td className="px-4 py-3 text-center border-r border-dark-800 last:border-r-0">
                                <div className="w-4 h-4 rounded border border-dark-600 mx-auto hover:border-brand-yellow cursor-pointer"></div>
                            </td>
                            <td className="px-4 py-3 text-sm text-white whitespace-nowrap border-r border-dark-800 last:border-r-0">{row.date}</td>
                            <td className="px-4 py-3 text-sm font-medium text-white tracking-tight border-r border-dark-800 last:border-r-0">@{row.profile}</td>
                            <td className="px-4 py-3 border-r border-dark-800 last:border-r-0">
                                {row.type === 'STORY' ? (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-transparent border border-brand-yellow/30 text-brand-yellow">Story</span>
                                ) : (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-transparent border border-blue-500/30 text-blue-400">Post</span>
                                )}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-300 text-right border-r border-dark-800 last:border-r-0">{row.items}</td>
                            <td className="px-4 py-3 text-sm text-gray-500 text-right border-r border-dark-800 last:border-r-0">{row.size}</td>
                            <td className="px-4 py-3 text-sm text-gray-300 border-r border-dark-800 last:border-r-0">
                                <div className="flex flex-col">
                                    <span>{row.provider}</span>
                                    {row.status === 'FALLBACK' && <span className="text-[10px] text-orange-400">Fallback Route</span>}
                                </div>
                            </td>
                            <td className="px-4 py-3 border-r border-dark-800 last:border-r-0">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                                    row.status === 'SUCCESS' ? 'border-green-500/30 text-green-500' :
                                    row.status === 'FALLBACK' ? 'border-orange-500/30 text-orange-500' :
                                    'border-red-500/30 text-red-500'
                                }`}>
                                    {row.status}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-right border-r border-dark-800 last:border-r-0">
                                <div className="flex items-center justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                    <button className="text-gray-400 hover:text-white transition-colors">
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button className="text-gray-400 hover:text-red-400 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <button className="text-gray-400 hover:text-white transition-colors">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};