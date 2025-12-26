import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, Database, AlertCircle, Layers, ArrowUpDown, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { MOCK_LOGS, CHART_DATA } from '../constants';

export const Dashboard: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Content Extracted" 
          value="45.2k" 
          subValue="+12% vs last month" 
          icon={Database} 
          trend="up"
        />
        <StatCard 
          label="Active Profiles" 
          value="128" 
          subValue="4 added this week" 
          icon={Activity} 
          color="text-blue-400"
        />
        <StatCard 
          label="API Success Rate" 
          value="98.2%" 
          subValue="1.8% fallback rate" 
          icon={Layers} 
          color="text-green-400"
          trend="up"
        />
         <StatCard 
          label="Failed Extractions" 
          value="24" 
          subValue="Requires attention" 
          icon={AlertCircle} 
          color="text-red-400"
          trend="down"
        />
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Chart */}
        <div className="lg:col-span-2 bg-dark-800 p-6 rounded-2xl border border-dark-700">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white tracking-tight">Extraction Volume</h3>
                <div className="flex gap-2">
                    <span className="flex items-center text-xs text-gray-400 font-medium"><div className="w-2 h-2 rounded-full bg-brand-yellow mr-2"></div> Stories</span>
                    <span className="flex items-center text-xs text-gray-400 font-medium"><div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div> Posts</span>
                </div>
            </div>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA}>
                    <defs>
                    <linearGradient id="colorStories" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ffcd38" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ffcd38" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPosts" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="name" stroke="#71717a" axisLine={false} tickLine={false} tick={{fontSize: 12, fontFamily: 'Plus Jakarta Sans'}} dy={10} />
                    <YAxis stroke="#71717a" axisLine={false} tickLine={false} tick={{fontSize: 12, fontFamily: 'Plus Jakarta Sans'}} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff', borderRadius: '8px' }} 
                        itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="stories" stroke="#ffcd38" strokeWidth={3} fillOpacity={1} fill="url(#colorStories)" />
                    <Area type="monotone" dataKey="posts" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPosts)" />
                </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Side Chart/Info */}
        <div className="bg-dark-800 p-6 rounded-2xl border border-dark-700">
            <h3 className="text-lg font-bold text-white mb-6 tracking-tight">Error Distribution</h3>
            <div className="h-48 w-full mb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={CHART_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis dataKey="name" hide />
                        <Tooltip cursor={{fill: '#27272a'}} contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: 'white' }} />
                        <Bar dataKey="errors" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-dark-900 rounded-lg border border-dark-700">
                    <span className="text-sm text-gray-400 font-medium">Rate Limit</span>
                    <span className="text-sm font-bold text-red-400">12 events</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-dark-900 rounded-lg border border-dark-700">
                    <span className="text-sm text-gray-400 font-medium">Timeout</span>
                    <span className="text-sm font-bold text-orange-400">8 events</span>
                </div>
            </div>
        </div>
      </div>

      {/* Recent Activity Table - Updated with Subtle Vertical Lines */}
      <div className="bg-dark-900 border border-dark-700 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-dark-700 flex justify-between items-center bg-dark-800/30">
            <h3 className="text-base font-semibold text-white tracking-tight">Live Activity Log</h3>
            <button className="text-sm text-brand-yellow hover:text-white transition-colors font-medium">View All</button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-dark-800/50 border-b border-dark-700">
                    <tr>
                         <th className="w-12 px-4 py-3 text-center border-r border-dark-800 last:border-r-0">
                             <div className="w-4 h-4 rounded border border-dark-600 mx-auto hover:border-gray-400 transition-colors cursor-pointer"></div>
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white group transition-colors border-r border-dark-800 last:border-r-0">
                            <div className="flex items-center gap-2">Timestamp <ArrowUpDown className="w-3 h-3 text-dark-600 group-hover:text-gray-400" /></div>
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white group transition-colors border-r border-dark-800 last:border-r-0">
                             <div className="flex items-center gap-2">Profile <ArrowUpDown className="w-3 h-3 text-dark-600 group-hover:text-gray-400" /></div>
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white group transition-colors border-r border-dark-800 last:border-r-0">
                            <div className="flex items-center gap-2">Action <ArrowUpDown className="w-3 h-3 text-dark-600 group-hover:text-gray-400" /></div>
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white group transition-colors border-r border-dark-800 last:border-r-0">
                            <div className="flex items-center gap-2">Status <ArrowUpDown className="w-3 h-3 text-dark-600 group-hover:text-gray-400" /></div>
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider border-r border-dark-800 last:border-r-0">Details</th>
                         <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider text-right border-r border-dark-800 last:border-r-0">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-dark-800">
                    {MOCK_LOGS.map((log) => (
                        <tr key={log.id} className="bg-dark-900 hover:bg-dark-800/50 transition-colors h-16 group">
                            <td className="px-4 py-3 text-center border-r border-dark-800 last:border-r-0">
                                <div className="w-4 h-4 rounded border border-dark-600 mx-auto hover:border-brand-yellow cursor-pointer"></div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap border-r border-dark-800 last:border-r-0">{log.timestamp}</td>
                            <td className="px-4 py-3 text-sm font-medium text-white tracking-tight border-r border-dark-800 last:border-r-0">@{log.profile}</td>
                            <td className="px-4 py-3 text-sm text-gray-300 border-r border-dark-800 last:border-r-0">{log.action}</td>
                            <td className="px-4 py-3 border-r border-dark-800 last:border-r-0">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                                    log.status === 'SUCCESS' ? 'border-green-500/30 text-green-500' :
                                    log.status === 'FAILURE' ? 'border-red-500/30 text-red-500' :
                                    'border-orange-500/30 text-orange-500'
                                }`}>
                                    {log.status}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500 border-r border-dark-800 last:border-r-0">{log.details}</td>
                             <td className="px-4 py-3 text-right border-r border-dark-800 last:border-r-0">
                                <div className="flex items-center justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                    <button className="text-gray-400 hover:text-white transition-colors">
                                        <Pencil className="w-4 h-4" />
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