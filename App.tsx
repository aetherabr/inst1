import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './views/Dashboard';
import { Settings } from './views/Settings';
import { Profiles } from './views/Profiles';
import { Content } from './views/Content';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('DASHBOARD');

  const renderView = () => {
    switch (currentView) {
      case 'DASHBOARD':
        return <Dashboard />;
      case 'SETTINGS':
        return <Settings />;
      case 'PROFILES':
        return <Profiles />;
      case 'CONTENT':
        return <Content />;
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch (currentView) {
      case 'DASHBOARD': return 'Dashboard Overview';
      case 'SETTINGS': return 'System Settings';
      case 'PROFILES': return 'Profile Management';
      case 'CONTENT': return 'Analytics & Reports';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-900 text-white font-sans selection:bg-brand-yellow selection:text-dark-900">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <Header title={getPageTitle()} />
        
        <div className="flex-1 overflow-y-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;