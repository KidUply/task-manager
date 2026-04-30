import React from 'react';
import { LayoutList } from 'lucide-react';

const EmptyState = ({ title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center h-full animate-fade-in">
      <div 
        className="w-24 h-24 rounded-full flex-center mb-6" 
        style={{ 
          background: 'var(--bg-card)', 
          border: 'var(--glass-border)',
          color: 'var(--primary-color)'
        }}
      >
        <LayoutList size={48} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 max-w-md mb-8">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
