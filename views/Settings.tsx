import React, { useState, useCallback } from 'react';
import { Save, RefreshCw, Server, Cloud, ArrowUp, ArrowDown, Trash2, Plus, AlertTriangle, CheckCircle, Settings as SettingsIcon, Pencil } from 'lucide-react';
import { MOCK_APIS } from '../constants';
import { ApiConfig } from '../types';

// Sub-component defined outside to prevent re-creation on every render
interface ApiListProps {
    category: 'STORY' | 'POST';
    apis: ApiConfig[];
    onMove: (id: string, direction: 'up' | 'down') => void;
    onDelete: (id: string) => void;
}

const ApiList: React.FC<ApiListProps> = React.memo(({ category, apis, onMove, onDelete }) => {
    const filteredApis = apis.filter(api => api.category === category);
    
    return (
        <div className="space-y-4 mb-8">
            <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center">
                {category === 'STORY' ? 'Story' : 'Post'} Extraction API Priority
                <span className="ml-2 px-2 py-0.5 bg-dark-700 rounded text-[10px] text-gray-300 normal-case font-normal tracking-normal">Top runs first</span>
            </h4>
            
            {filteredApis.length === 0 && (
                <div className="p-4 border border-dashed border-dark-700 rounded-xl text-gray-500 text-sm text-center">
                    No APIs configured for this category.
                </div>
            )}

            <div className="border border-dark-700 rounded-lg overflow-hidden">
            {filteredApis.map((api, idx) => (
                <div key={api.id} className="bg-dark-900 border-b border-dark-800 last:border-0 flex items-center hover:bg-dark-800/50 transition-all group min-h-[5rem]">
                    {/* Column 1: Sort - Simulating Table Cell */}
                    <div className="flex flex-col gap-1 px-4 py-4 border-r border-dark-800 w-16 items-center justify-center self-stretch">
                         <button 
                            onClick={() => onMove(api.id, 'up')}
                            disabled={idx === 0}
                            className="p-1 hover:bg-dark-700 rounded text-gray-500 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors">
                            <ArrowUp className="w-4 h-4" />
                         </button>
                         <button 
                             onClick={() => onMove(api.id, 'down')}
                             disabled={idx === filteredApis.length - 1}
                             className="p-1 hover:bg-dark-700 rounded text-gray-500 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors">
                            <ArrowDown className="w-4 h-4" />
                         </button>
                    </div>
                    
                    {/* Column 2: Info - Simulating Table Cell */}
                    <div className="flex-1 px-6 py-4 border-r border-dark-800 self-stretch flex flex-col justify-center">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <h5 className="font-bold text-white text-sm tracking-tight">
                                    {api.name}
                                </h5>
                                {idx === 0 ? (
                                    <span className="px-2.5 py-0.5 rounded-full border border-blue-500/30 text-blue-400 text-[10px] uppercase font-bold tracking-wider">Primary</span>
                                ) : (
                                    <span className="px-2.5 py-0.5 rounded-full border border-orange-500/30 text-orange-400 text-[10px] uppercase font-bold tracking-wider">Fallback</span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                {api.status === 'ONLINE' ? (
                                    <span className="flex items-center text-xs font-medium text-green-500 px-2 py-1 rounded border border-green-500/30 bg-transparent">
                                        <CheckCircle className="w-3 h-3 mr-1" /> Online
                                    </span>
                                ) : (
                                    <span className="flex items-center text-xs font-medium text-red-500 px-2 py-1 rounded border border-red-500/30 bg-transparent">
                                        <AlertTriangle className="w-3 h-3 mr-1" /> Degraded
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-6 text-xs text-gray-400 mt-2">
                            <span>Endpoint: <span className="text-gray-300 ml-1">{api.endpoint}</span></span>
                            <span>Success Rate: <span className="text-white ml-1">{api.successRate}%</span></span>
                        </div>
                    </div>

                    {/* Column 3: Actions - Simulating Table Cell */}
                    <div className="flex items-center justify-center gap-3 px-4 py-4 w-32 self-stretch">
                         <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-gray-400 hover:text-white transition-colors">
                                <Pencil className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={() => onDelete(api.id)}
                                className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            </div>
             <button className="w-full mt-4 py-3 border border-dashed border-dark-600 rounded-xl text-gray-500 hover:text-brand-yellow hover:border-brand-yellow hover:bg-brand-yellow/5 transition-all flex items-center justify-center gap-2 text-sm font-medium tracking-tight">
                <Plus className="w-4 h-4" /> Add New {category === 'STORY' ? 'Story' : 'Post'} Provider
            </button>
        </div>
    );
});

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'API' | 'STORAGE'>('API');
  const [apis, setApis] = useState<ApiConfig[]>(MOCK_APIS);

  const handleDelete = useCallback((id: string) => {
      if(window.confirm('Are you sure you want to remove this API configuration?')) {
        setApis(prev => prev.filter(api => api.id !== id));
      }
  }, []);

  const moveApi = useCallback((id: string, direction: 'up' | 'down') => {
    setApis(prev => {
        // Find the index of the item we want to move
        const currentIndex = prev.findIndex(a => a.id === id);
        if (currentIndex === -1) return prev;
        
        const currentApi = prev[currentIndex];
        const category = currentApi.category;

        // Get all items of the same category, keeping track of their original global indices
        const categoryIndices = prev
            .map((api, idx) => ({ ...api, originalIndex: idx }))
            .filter(api => api.category === category);
        
        // Find where our target item is within its category list
        const internalIndex = categoryIndices.findIndex(a => a.id === id);

        if (internalIndex === -1) return prev;

        let targetSiblingIndex = -1;

        if (direction === 'up') {
            if (internalIndex === 0) return prev; // Already at top of category
            targetSiblingIndex = internalIndex - 1;
        } else {
            if (internalIndex === categoryIndices.length - 1) return prev; // Already at bottom
            targetSiblingIndex = internalIndex + 1;
        }

        const sibling = categoryIndices[targetSiblingIndex];
        
        // Swap logic: We swap the item at 'currentIndex' with the item at 'sibling.originalIndex'
        const newApis = [...prev];
        const indexA = currentIndex;
        const indexB = sibling.originalIndex;

        [newApis[indexA], newApis[indexB]] = [newApis[indexB], newApis[indexA]];

        return newApis;
    });
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-6 mb-8 border-b border-dark-700 pb-1">
        <button
          onClick={() => setActiveTab('API')}
          className={`pb-4 text-sm font-medium transition-colors relative tracking-tight ${
            activeTab === 'API' ? 'text-brand-yellow' : 'text-gray-400 hover:text-white'
          }`}
        >
          API Integrations
          {activeTab === 'API' && <span className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-brand-yellow"></span>}
        </button>
        <button
          onClick={() => setActiveTab('STORAGE')}
          className={`pb-4 text-sm font-medium transition-colors relative tracking-tight ${
            activeTab === 'STORAGE' ? 'text-brand-yellow' : 'text-gray-400 hover:text-white'
          }`}
        >
          Storage Configuration (S3)
          {activeTab === 'STORAGE' && <span className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-brand-yellow"></span>}
        </button>
      </div>

      {activeTab === 'API' && (
        <div className="bg-dark-800 rounded-2xl border border-dark-700 p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Scraping Architecture</h2>
                    <p className="text-gray-400 text-sm mt-1">Configure redundancy and fallback strategies for Instagram data extraction.</p>
                </div>
                <button className="flex items-center gap-2 bg-dark-700 hover:bg-dark-600 text-white px-4 py-2 rounded-lg text-sm transition-colors border border-dark-600 font-medium tracking-tight">
                    <RefreshCw className="w-4 h-4" /> Test All Connections
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <ApiList category="STORY" apis={apis} onMove={moveApi} onDelete={handleDelete} />
                <ApiList category="POST" apis={apis} onMove={moveApi} onDelete={handleDelete} />
            </div>
        </div>
      )}

      {activeTab === 'STORAGE' && (
        <div className="bg-dark-800 rounded-2xl border border-dark-700 p-8 max-w-3xl">
            <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                    <Cloud className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                    Cloud Storage
                </h2>
            </div>
            <p className="text-gray-400 text-sm mb-8 ml-16 -mt-4">
                Configure Cloudflare R2 or S3 Compatible Storage for media assets.
            </p>
            
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-200 mb-2">Provider</label>
                        <select className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none transition-all appearance-none">
                            <option value="R2">Cloudflare R2</option>
                            <option value="AWS">AWS S3</option>
                            <option value="MINIO">MinIO</option>
                            <option value="GCP">Google Cloud Storage</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Bucket Name</label>
                        <input type="text" defaultValue="instagram-tracker-data" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none transition-all placeholder-gray-600" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Region</label>
                        <input type="text" defaultValue="us-east-1" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none transition-all placeholder-gray-600" />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-200 mb-2">Endpoint URL</label>
                        <input type="text" defaultValue="https://<accountid>.r2.cloudflarestorage.com" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none transition-all text-sm" />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-200 mb-2">Access Key ID</label>
                        <input type="password" value="...................." className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none transition-all text-sm tracking-widest" />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-200 mb-2">Secret Access Key</label>
                        <input type="password" value="........................................" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none transition-all text-sm tracking-widest" />
                    </div>

                     <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-200 mb-2">Public Base URL</label>
                        <input type="text" defaultValue="https://cdn.instatracker.com" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none transition-all text-sm" />
                    </div>
                </div>

                <div className="pt-6 border-t border-dark-700 flex justify-end gap-3">
                     <button type="button" className="px-5 py-2.5 rounded-lg border border-dark-600 text-gray-300 hover:text-white hover:bg-dark-700 transition-colors font-medium tracking-tight">
                        Test Connection
                    </button>
                    <button type="button" className="px-5 py-2.5 rounded-lg bg-brand-yellow text-dark-900 font-bold hover:bg-[#eebb20] transition-colors flex items-center gap-2 tracking-tight">
                        <Save className="w-4 h-4" /> Save Configuration
                    </button>
                </div>
            </form>
        </div>
      )}
    </div>
  );
};