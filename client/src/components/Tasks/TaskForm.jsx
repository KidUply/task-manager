import React, { useState, useEffect } from 'react';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import Input from '../UI/Input';

const TaskForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData && isOpen) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
      setStatus(initialData.status);
      setDeadline(initialData.deadline ? initialData.deadline.split('T')[0] : '');
    } else if (isOpen) {
      setTitle('');
      setDescription('');
      setStatus('todo');
      setDeadline('');
    }
    setError('');
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const taskData = {
        title,
        description,
        status,
        deadline: deadline || null
      };
      
      const result = await onSubmit(taskData);
      
      if (result.success) {
        onClose();
      } else {
        setError(result.error || 'Failed to save task');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={initialData ? 'Edit Task' : 'Create New Task'}
    >
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 mb-4 rounded-md text-sm bg-red-500/10 text-red-400">
            {error}
          </div>
        )}
        
        <Input
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="What needs to be done?"
          containerClassName="mb-4"
          autoFocus
        />
        
        <div className="form-group mb-4">
          <label className="form-label">Description (Optional)</label>
          <textarea
            className="form-control min-h-[100px] resize-y"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details..."
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          
          <Input
            label="Deadline (Optional)"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskForm;
