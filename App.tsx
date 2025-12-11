
import React, { useState, useEffect } from 'react';
import { useStore } from './store/useStore';
import { mockDb } from './db/mockDb';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { AdminPortal } from './pages/AdminPortal';
import { Auth } from './pages/Auth';
import { Stats } from './pages/Stats';
import { Profile } from './pages/Profile';

const App: React.FC = () => {
  const { isAuthenticated, refreshData } = useStore();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    mockDb.init();
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated, refreshData]);

  if (!isAuthenticated) {
    return <Auth />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'admin':
        return <AdminPortal />;
      case 'stats':
        return <Stats />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
