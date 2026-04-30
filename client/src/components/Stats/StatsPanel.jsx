import React, { useEffect, useState } from 'react';
import { LayoutList, Clock, Activity, CheckCircle2 } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, delay }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = value / (duration / 16);
    
    if (value === 0) return;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div 
      className="glass-panel p-5 flex items-center gap-4 animate-slide-up opacity-0"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div 
        className="w-12 h-12 rounded-xl flex-center flex-shrink-0"
        style={{ 
          background: `rgba(${color}, 0.1)`, 
          color: `rgb(${color})`,
          boxShadow: `0 4px 15px rgba(${color}, 0.2)` 
        }}
      >
        <Icon size={24} />
      </div>
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-white mt-1">{displayValue}</h3>
      </div>
    </div>
  );
};

const StatsPanel = ({ stats }) => {
  if (!stats) return null;

  const statItems = [
    { title: 'Total Tasks', value: stats.total, icon: LayoutList, color: '102, 126, 234' }, // Primary
    { title: 'To Do', value: stats.todo, icon: Clock, color: '156, 163, 175' }, // Gray
    { title: 'In Progress', value: stats.in_progress, icon: Activity, color: '251, 191, 36' }, // Amber
    { title: 'Completed', value: stats.done, icon: CheckCircle2, color: '0, 212, 170' }, // Teal
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems.map((item, index) => (
        <StatCard 
          key={item.title}
          title={item.title}
          value={item.value || 0}
          icon={item.icon}
          color={item.color}
          delay={index * 100}
        />
      ))}
    </div>
  );
};

export default StatsPanel;
