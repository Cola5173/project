import React, { createContext, useContext, useState, useEffect } from 'react';

interface SystemStats {
  onlineUsers: number;
  systemStatus: 'normal' | 'warning' | 'error';
  totalStorage: number;
  usedStorage: number;
  activeConnections: number;
}

interface SystemContextType {
  stats: SystemStats;
  updateStats: (newStats: Partial<SystemStats>) => void;
  isLoading: boolean;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<SystemStats>({
    onlineUsers: 245,
    systemStatus: 'normal',
    totalStorage: 2500, // GB
    usedStorage: 1875, // GB
    activeConnections: 156
  });
  const [isLoading, setIsLoading] = useState(false);

  const updateStats = (newStats: Partial<SystemStats>) => {
    setStats(prev => ({ ...prev, ...newStats }));
  };

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        onlineUsers: prev.onlineUsers + Math.floor(Math.random() * 10 - 5),
        activeConnections: prev.activeConnections + Math.floor(Math.random() * 6 - 3),
        usedStorage: prev.usedStorage + Math.random() * 2 - 1
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SystemContext.Provider value={{ stats, updateStats, isLoading }}>
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (context === undefined) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
};