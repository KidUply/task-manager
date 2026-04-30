import React from 'react';
import { Filter, SortDesc, SortAsc } from 'lucide-react';
import Button from '../UI/Button';

const TaskFilters = ({ currentStatus, onStatusChange, currentSort, onSortChange }) => {
  const statuses = [
    { value: '', label: 'All Tasks' },
    { value: 'todo', label: 'To Do' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'done', label: 'Done' }
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6 p-4 glass-panel animate-fade-in">
      <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
        <Filter size={16} className="text-gray-400 mr-2 flex-shrink-0" />
        {statuses.map(status => (
          <button
            key={status.value}
            onClick={() => onStatusChange(status.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border cursor-pointer outline-none
              ${currentStatus === status.value 
                ? 'bg-white/10 text-white border-white/20' 
                : 'bg-transparent text-gray-400 border-transparent hover:bg-white/5 hover:text-gray-300'
              }
            `}
          >
            {status.label}
          </button>
        ))}
      </div>
      
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <span className="text-sm text-gray-400">Sort by:</span>
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="form-control !py-1.5 !w-auto text-sm cursor-pointer"
        >
          <option value="created_at">Newest First</option>
          <option value="deadline">Nearest Deadline</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilters;
