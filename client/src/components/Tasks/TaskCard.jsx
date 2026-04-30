import React from 'react';
import { Calendar, Edit2, Trash2, Clock } from 'lucide-react';
import Button from '../UI/Button';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && task.status !== 'done';
  const isNearDeadline = task.deadline && new Date(task.deadline) < new Date(Date.now() + 86400000) && task.status !== 'done' && !isOverdue;

  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const statusColors = {
    todo: 'var(--text-secondary)',
    in_progress: 'var(--accent-warning)',
    done: 'var(--accent-success)'
  };

  const statusLabels = {
    todo: 'To Do',
    in_progress: 'In Progress',
    done: 'Done'
  };

  return (
    <div 
      className="glass-panel p-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
      style={{ borderLeft: `4px solid ${statusColors[task.status]}` }}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg pr-8">{task.title}</h3>
        <div className={`badge badge-${task.status} absolute top-5 right-5`}>
          {statusLabels[task.status]}
        </div>
      </div>
      
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center justify-between mt-auto">
        <div className={`flex items-center gap-2 text-xs font-medium px-2 py-1 rounded-md
          ${isOverdue ? 'bg-red-500/10 text-red-400' : ''}
          ${isNearDeadline ? 'bg-amber-500/10 text-amber-400' : ''}
          ${!isOverdue && !isNearDeadline ? 'text-gray-400' : ''}
        `}>
          {task.deadline ? <Calendar size={14} /> : <Clock size={14} />}
          <span>{formatDate(task.deadline)}</span>
        </div>
        
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" className="!p-2" onClick={() => onEdit(task)}>
            <Edit2 size={16} />
          </Button>
          <Button variant="danger" className="!p-2" onClick={() => onDelete(task)}>
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
