import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, CheckSquare, PlusCircle, User, LogOut, X, Activity } from 'lucide-react';

const Sidebar = ({ onClose }) => {
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    // { name: 'Tasks', path: '/tasks', icon: CheckSquare }, // Can be added later
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="glass-panel h-full w-64 flex flex-col border-y-0 border-l-0 rounded-none relative z-50">
      <div className="p-6 flex items-center justify-between border-b" style={{ borderColor: 'var(--glass-border)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex-center text-white">
            <Activity size={20} />
          </div>
          <span className="text-xl font-bold text-gradient tracking-tight">TaskFlow</span>
        </div>
        <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white bg-transparent border-none">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => {
              if (window.innerWidth < 1024) onClose();
            }}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
              ${isActive 
                ? 'bg-white/10 text-white font-medium shadow-sm' 
                : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}
            `}
          >
            <item.icon size={20} className="group-hover:scale-110 transition-transform" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t" style={{ borderColor: 'var(--glass-border)' }}>
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex-center text-white font-bold">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors bg-transparent border-none cursor-pointer"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
