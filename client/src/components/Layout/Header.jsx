import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="glass-panel rounded-none border-t-0 border-x-0 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden text-gray-400 hover:text-white bg-transparent border-none cursor-pointer p-1"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-lg font-medium hidden sm:block">Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Placeholder for search/notifications if needed */}
        <div className="relative hidden md:block">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            className="form-control pl-10 py-2 text-sm bg-black/20 w-64"
          />
        </div>
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
