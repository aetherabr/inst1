import React, { useState } from 'react';
import { Plus, Instagram, Search, Filter, ArrowUpDown, Pencil, Trash2, Eye, X, User, Save, Clock, Check, ListFilter, Smartphone, Image as ImageIcon, Zap, AlertCircle } from 'lucide-react';
import { MOCK_PROFILES } from '../constants';
import { Profile, ContentType } from '../types';

export const Profiles: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [profiles, setProfiles] = useState<Profile[]>(MOCK_PROFILES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  // Form State
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    avatarUrl: '',
    frequencyHours: 6, // Default to every 6 hours
    status: 'ACTIVE' as 'ACTIVE' | 'PAUSED' | 'ERROR',
    categories: ['STORY', 'POST'] as ContentType[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleCategory = (category: ContentType) => {
    setFormData(prev => {
      const exists = prev.categories.includes(category);
      if (exists) {
        // Prevent removing the last category
        if (prev.categories.length === 1) return prev;
        return { ...prev, categories: prev.categories.filter(c => c !== category) };
      } else {
        return { ...prev, categories: [...prev.categories, category] };
      }
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate frequency (times per day) based on hours
    // e.g., Every 6 hours = 24/6 = 4 times per day
    const frequencyPerDay = Math.round(24 / Number(formData.frequencyHours));

    const newProfile: Profile = {
      id: Date.now().toString(),
      username: formData.username.replace('@', ''),
      fullName: formData.fullName,
      avatarUrl: formData.avatarUrl || `https://ui-avatars.com/api/?name=${formData.username}&background=random`,
      status: formData.status,
      frequency: frequencyPerDay,
      lastScraped: 'Pending',
      categories: formData.categories,
      totalMedia: 0
    };

    setProfiles(prev => [newProfile, ...prev]);
    setIsModalOpen(false);
    
    // Reset form
    setFormData({
        username: '',
        fullName: '',
        avatarUrl: '',
        frequencyHours: 6,
        status: 'ACTIVE',
        categories: ['STORY', 'POST']
    });
  };

  const filteredProfiles = profiles.filter(p => {
    const matchesSearch = p.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 space-y-8 relative">
      
      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-all">
            <div className="bg-dark-800 rounded-2xl border border-dark-700 w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden flex flex-col max-h-[90vh]">
                {/* Modal Header */}
                <div className="flex justify-between items-center px-8 py-6 border-b border-dark-700 bg-dark-800">
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                           <Instagram className="w-5 h-5 text-brand-yellow" /> 
                           Monitor New Profile
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">Configure target parameters for automated extraction.</p>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-dark-700 rounded-lg"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Form Scrollable Area */}
                <div className="overflow-y-auto custom-scrollbar flex-1">
                    <form onSubmit={handleSave} className="p-8 space-y-8">
                        
                        {/* Section 1: Identity */}
                        <div className="space-y-4">
                             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                <User className="w-3 h-3" /> Target Identity
                             </h3>
                             <div className="flex flex-col sm:flex-row gap-6">
                                {/* Visual Preview */}
                                <div className="flex-shrink-0 flex flex-col items-center justify-center w-full sm:w-32 bg-dark-900 rounded-xl border border-dark-700 border-dashed p-4 gap-3">
                                    <div className="w-16 h-16 rounded-full bg-dark-800 border-2 border-dark-600 flex items-center justify-center overflow-hidden relative">
                                        {formData.username ? (
                                            <img 
                                                src={`https://ui-avatars.com/api/?name=${formData.username}&background=random`} 
                                                alt="Preview" 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-6 h-6 text-gray-600" />
                                        )}
                                    </div>
                                    <span className="text-xs text-gray-500 font-mono text-center truncate w-full">
                                        @{formData.username || 'username'}
                                    </span>
                                </div>

                                {/* Inputs */}
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Instagram Username <span className="text-brand-yellow">*</span></label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 font-bold">@</span>
                                            </div>
                                            <input 
                                                required
                                                name="username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                                type="text" 
                                                placeholder="marketing_guru" 
                                                className="w-full bg-dark-900 border border-dark-700 rounded-lg pl-8 pr-4 py-2.5 text-white focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none transition-all placeholder-gray-600 text-sm group-hover:border-dark-600" 
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Internal Reference Name</label>
                                        <input 
                                            required
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            type="text" 
                                            placeholder="e.g. Marketing Official Account" 
                                            className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-2.5 text-white focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none transition-all placeholder-gray-600 text-sm hover:border-dark-600" 
                                        />
                                    </div>
                                </div>
                             </div>
                        </div>

                        <div className="h-px bg-dark-700 w-full" />

                        {/* Section 2: Configuration */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                <Zap className="w-3 h-3" /> Extraction Rules
                             </h3>
                            
                            {/* Categories Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div 
                                    onClick={() => toggleCategory('STORY')}
                                    className={`cursor-pointer relative p-4 rounded-xl border-2 transition-all duration-200 flex items-start gap-4 ${
                                        formData.categories.includes('STORY')
                                        ? 'bg-brand-yellow/5 border-brand-yellow'
                                        : 'bg-dark-900 border-dark-700 hover:border-dark-600'
                                    }`}
                                >
                                    <div className={`p-2 rounded-lg ${formData.categories.includes('STORY') ? 'bg-brand-yellow text-dark-900' : 'bg-dark-800 text-gray-400'}`}>
                                        <Smartphone className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className={`font-bold text-sm ${formData.categories.includes('STORY') ? 'text-white' : 'text-gray-400'}`}>Stories</span>
                                            {formData.categories.includes('STORY') && <Check className="w-4 h-4 text-brand-yellow" />}
                                        </div>
                                        <p className="text-xs text-gray-500 leading-relaxed"> ephemeral content, 24h expiration. Includes video & image.</p>
                                    </div>
                                </div>

                                <div 
                                    onClick={() => toggleCategory('POST')}
                                    className={`cursor-pointer relative p-4 rounded-xl border-2 transition-all duration-200 flex items-start gap-4 ${
                                        formData.categories.includes('POST')
                                        ? 'bg-blue-500/5 border-blue-500'
                                        : 'bg-dark-900 border-dark-700 hover:border-dark-600'
                                    }`}
                                >
                                    <div className={`p-2 rounded-lg ${formData.categories.includes('POST') ? 'bg-blue-500 text-white' : 'bg-dark-800 text-gray-400'}`}>
                                        <ImageIcon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className={`font-bold text-sm ${formData.categories.includes('POST') ? 'text-white' : 'text-gray-400'}`}>Posts / Reels</span>
                                            {formData.categories.includes('POST') && <Check className="w-4 h-4 text-blue-500" />}
                                        </div>
                                        <p className="text-xs text-gray-500 leading-relaxed">Permanent feed posts, carousels, and reels content.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Frequency & Status */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Extraction Frequency</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                                        <select 
                                            name="frequencyHours"
                                            value={formData.frequencyHours}
                                            onChange={handleInputChange}
                                            className="w-full bg-dark-900 border border-dark-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none transition-all appearance-none text-sm cursor-pointer hover:border-dark-600"
                                        >
                                            <option value="1">Hourly (High Priority)</option>
                                            <option value="3">Every 3 Hours</option>
                                            <option value="6">Every 6 Hours (Standard)</option>
                                            <option value="12">Twice Daily</option>
                                            <option value="24">Once Daily</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Initial State</label>
                                    <div className="relative">
                                        <AlertCircle className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${formData.status === 'ACTIVE' ? 'text-green-500' : 'text-gray-500'}`} />
                                        <select 
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            className="w-full bg-dark-900 border border-dark-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none transition-all appearance-none text-sm cursor-pointer hover:border-dark-600"
                                        >
                                            <option value="ACTIVE">Active (Start Immediately)</option>
                                            <option value="PAUSED">Paused (Manual Trigger)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer Fixed */}
                <div className="p-6 border-t border-dark-700 bg-dark-800/50 flex justify-end gap-3 z-10">
                    <button 
                        type="button" 
                        onClick={() => setIsModalOpen(false)}
                        className="px-5 py-2.5 rounded-lg border border-dark-600 text-gray-300 hover:text-white hover:bg-dark-700 transition-colors font-medium tracking-tight text-sm"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave}
                        type="button" 
                        className="px-6 py-2.5 rounded-lg bg-brand-yellow text-dark-900 font-bold hover:bg-[#eebb20] transition-colors flex items-center gap-2 tracking-tight text-sm shadow-lg shadow-brand-yellow/10 transform active:scale-95"
                    >
                        <Save className="w-4 h-4" /> Create Monitor
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Monitored Profiles</h2>
          <p className="text-gray-400 mt-1 tracking-tight">Manage target accounts and extraction frequency.</p>
        </div>
        <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-yellow text-dark-900 px-4 py-2 rounded-lg font-bold hover:bg-[#eebb20] transition-colors flex items-center gap-2 tracking-tight shadow-lg shadow-brand-yellow/10"
        >
          <Plus className="w-4 h-4" /> Add Profile
        </button>
      </div>

      {/* Control Card (Filters, Search, Sort) */}
      <div className="bg-dark-800 border border-dark-700 rounded-xl p-5 flex flex-col md:flex-row gap-4 items-center justify-between shadow-lg">
          {/* Search */}
          <div className="relative w-full md:max-w-md">
                <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                    type="text" 
                    placeholder="Search by username or name..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-gray-600 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none transition-all"
                />
            </div>

            {/* Controls */}
            <div className="flex w-full md:w-auto gap-3">
                <div className="relative flex-1 md:w-40">
                    <Filter className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full bg-dark-900 border border-dark-700 rounded-lg pl-9 pr-8 py-2 text-sm text-white appearance-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none cursor-pointer hover:bg-dark-700 transition-colors"
                    >
                        <option value="All">All Status</option>
                        <option value="ACTIVE">Active</option>
                        <option value="PAUSED">Paused</option>
                        <option value="ERROR">Error</option>
                    </select>
                </div>

                <div className="relative flex-1 md:w-40">
                    <ListFilter className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full bg-dark-900 border border-dark-700 rounded-lg pl-9 pr-8 py-2 text-sm text-white appearance-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none cursor-pointer hover:bg-dark-700 transition-colors"
                    >
                        <option value="Newest">Newest Added</option>
                        <option value="Oldest">Oldest Added</option>
                        <option value="Media">Media Count</option>
                        <option value="Name">Name (A-Z)</option>
                    </select>
                </div>
            </div>
      </div>

      {/* Table Container */}
      <div className="bg-dark-900 border border-dark-700 rounded-lg overflow-hidden flex flex-col">
        {/* Table */}
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-dark-800/50 border-b border-dark-700">
                    <tr>
                        <th className="w-12 px-4 py-3 text-center border-r border-dark-800 last:border-r-0">
                             <div className="w-4 h-4 rounded border border-dark-600 mx-auto hover:border-gray-400 transition-colors cursor-pointer"></div>
                        </th>
                        {/* 1. Usuario */}
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white group transition-colors border-r border-dark-800 last:border-r-0">
                            <div className="flex items-center gap-2">User <ArrowUpDown className="w-3 h-3 text-dark-600 group-hover:text-gray-400" /></div>
                        </th>
                         {/* 2. Nome */}
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white group transition-colors border-r border-dark-800 last:border-r-0">
                            <div className="flex items-center gap-2">Name <ArrowUpDown className="w-3 h-3 text-dark-600 group-hover:text-gray-400" /></div>
                        </th>
                        {/* 3. Monitoramento */}
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white group transition-colors border-r border-dark-800 last:border-r-0">
                             <div className="flex items-center gap-2">Monitoring <ArrowUpDown className="w-3 h-3 text-dark-600 group-hover:text-gray-400" /></div>
                        </th>
                        {/* 4. Frequencia */}
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white group transition-colors border-r border-dark-800 last:border-r-0">
                             <div className="flex items-center gap-2">Frequency <ArrowUpDown className="w-3 h-3 text-dark-600 group-hover:text-gray-400" /></div>
                        </th>
                        {/* 5. Status */}
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white group transition-colors border-r border-dark-800 last:border-r-0">
                             <div className="flex items-center gap-2">Status <ArrowUpDown className="w-3 h-3 text-dark-600 group-hover:text-gray-400" /></div>
                        </th>
                         {/* 6. Total Extraido */}
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider text-right cursor-pointer hover:text-white group transition-colors border-r border-dark-800 last:border-r-0">
                             <div className="flex items-center justify-end gap-2">Total Extracted <ArrowUpDown className="w-3 h-3 text-dark-600 group-hover:text-gray-400" /></div>
                        </th>
                         {/* 7. Ultima Extracao */}
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white group transition-colors border-r border-dark-800 last:border-r-0">
                             <div className="flex items-center gap-2">Last Scraped <ArrowUpDown className="w-3 h-3 text-dark-600 group-hover:text-gray-400" /></div>
                        </th>
                         {/* 8. Acoes */}
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider text-right border-r border-dark-800 last:border-r-0">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-dark-800">
                    {filteredProfiles.map((profile) => (
                        <tr key={profile.id} className="bg-dark-900 hover:bg-dark-800/50 transition-colors h-16 group">
                            {/* Checkbox */}
                            <td className="px-4 py-3 text-center border-r border-dark-800 last:border-r-0">
                                <div className="w-4 h-4 rounded border border-dark-600 mx-auto hover:border-brand-yellow cursor-pointer"></div>
                            </td>

                            {/* 1. Usuario */}
                            <td className="px-4 py-3 border-r border-dark-800 last:border-r-0">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-8 h-8 flex-shrink-0">
                                        <img src={profile.avatarUrl} alt={profile.username} className="w-8 h-8 rounded-full bg-dark-800 object-cover" />
                                        <div className="absolute -bottom-1 -right-1 bg-dark-900 rounded-full p-0.5">
                                            <Instagram className="w-3 h-3 text-gray-400" />
                                        </div>
                                    </div>
                                    <span className="text-sm font-semibold text-white tracking-tight">@{profile.username}</span>
                                </div>
                            </td>

                            {/* 2. Nome */}
                            <td className="px-4 py-3 border-r border-dark-800 last:border-r-0">
                                <span className="text-sm text-gray-300 font-medium tracking-tight">{profile.fullName}</span>
                            </td>

                            {/* 3. Monitoramento */}
                            <td className="px-4 py-3 border-r border-dark-800 last:border-r-0">
                                <div className="flex gap-2">
                                    {profile.categories.includes('STORY') && (
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20">Story</span>
                                    )}
                                    {profile.categories.includes('POST') && (
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">Post</span>
                                    )}
                                </div>
                            </td>

                            {/* 4. Frequencia */}
                            <td className="px-4 py-3 border-r border-dark-800 last:border-r-0">
                                <span className="text-sm text-gray-300 font-medium">Every {Math.round(24 / profile.frequency)}h</span>
                            </td>

                            {/* 5. Status (Updated Style) */}
                            <td className="px-4 py-3 border-r border-dark-800 last:border-r-0">
                                {profile.status === 'ACTIVE' && (
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-green-500/10 text-green-500 border border-green-500/20">Active</span>
                                )}
                                {profile.status === 'PAUSED' && (
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-500/10 text-gray-400 border border-gray-500/20">Paused</span>
                                )}
                                {profile.status === 'ERROR' && (
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-500 border border-red-500/20">Error</span>
                                )}
                            </td>

                            {/* 6. Total Extraido */}
                            <td className="px-4 py-3 text-sm text-gray-300 font-medium text-right border-r border-dark-800 last:border-r-0">
                                {profile.totalMedia.toLocaleString()}
                            </td>

                            {/* 7. Ultima Extracao */}
                            <td className="px-4 py-3 text-sm text-gray-500 font-medium border-r border-dark-800 last:border-r-0">
                                {profile.lastScraped}
                            </td>

                            {/* 8. Acoes */}
                            <td className="px-4 py-3 text-right border-r border-dark-800 last:border-r-0">
                                <div className="flex items-center justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                    <button className="text-gray-400 hover:text-brand-yellow transition-colors" title="View Details">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button className="text-gray-400 hover:text-white transition-colors" title="Edit">
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button className="text-gray-400 hover:text-red-400 transition-colors" title="Delete">
                                        <Trash2 className="w-4 h-4" />
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