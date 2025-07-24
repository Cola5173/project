import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  PieChart, 
  HardDrive, 
  RefreshCw, 
  Users, 
  Gauge 
} from 'lucide-react';

interface SidebarProps {
  currentModule: string;
  onModuleChange: (module: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentModule, onModuleChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'overview', path: '/overview', icon: PieChart, label: '数据资源概览' },
    { id: 'storage', path: '/storage', icon: HardDrive, label: '数据存储监测' },
    { id: 'lifecycle', path: '/lifecycle', icon: RefreshCw, label: '数据生命周期监测' },
    { id: 'access', path: '/access', icon: Users, label: '数据访问监测' },
    { id: 'performance', path: '/performance', icon: Gauge, label: '数据资源性能监测' },
  ];

  const handleNavigation = (item: typeof menuItems[0]) => {
    navigate(item.path);
    onModuleChange(item.id);
  };

  const isActive = (path: string) => {
    return location.pathname === path || (location.pathname === '/' && path === '/overview');
  };

  return (
    <nav className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-4">
        {/* <h2 className="text-lg font-semibold text-gray-800 mb-4">功能导航</h2> */}
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;