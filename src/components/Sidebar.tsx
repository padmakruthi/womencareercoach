import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Map, BarChart2, FileText, MessageCircle,
  Settings, Sparkles, Brain
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/assessment', label: 'Skill Assessment', icon: Brain },
  { path: '/roadmap', label: 'Career Roadmap', icon: Map },
  { path: '/skills', label: 'Skill Tracker', icon: BarChart2 },
  { path: '/resume', label: 'Resume Guide', icon: FileText },
  { path: '/chatbot', label: 'AI Coach', icon: MessageCircle },
  { path: '/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobile, onClose }) => {
  const { user, darkMode } = useApp();
  const location = useLocation();

  return (
    <aside className={`flex flex-col h-full ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'} ${mobile ? '' : 'border-r'}`}>
      {/* Logo */}
      <div className="p-6 border-b border-inherit">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-violet-600 flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className={darkMode ? 'text-white' : 'text-gray-900'}>
            Women<span className="gradient-text">CC</span>
          </span>
        </Link>
      </div>

      {/* User profile */}
      {user && (
        <div className={`px-4 py-4 mx-3 mt-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-rose-50'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-violet-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className={`text-sm font-semibold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</p>
              <p className={`text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.careerGoal || 'Set a career goal'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} className={isActive ? 'text-white' : ''} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom badge */}
      <div className="p-4">
        <div className="p-3 rounded-xl bg-gradient-to-r from-rose-500/10 to-violet-600/10 border border-rose-200 dark:border-rose-900/30">
          <p className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>✨ 12,000+ women coached</p>
          <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Join the community</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
