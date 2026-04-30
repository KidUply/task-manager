import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
      {tasks.map((task, index) => (
        <div key={task.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in opacity-0" style={{ animationFillMode: 'forwards' }}>
          <TaskCard 
            task={task} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
