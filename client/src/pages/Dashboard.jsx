import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import StatsPanel from '../components/Stats/StatsPanel';
import TaskFilters from '../components/Tasks/TaskFilters';
import TaskList from '../components/Tasks/TaskList';
import TaskForm from '../components/Tasks/TaskForm';
import ConfirmDialog from '../components/UI/ConfirmDialog';
import EmptyState from '../components/UI/EmptyState';
import Button from '../components/UI/Button';

const Dashboard = () => {
  const { tasks, stats, loading, fetchTasks, fetchStats, createTask, updateTask, deleteTask } = useTasks();
  
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOption, setSortOption] = useState('created_at');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    fetchTasks(statusFilter, sortOption);
    fetchStats();
  }, [fetchTasks, fetchStats, statusFilter, sortOption]);

  const handleOpenCreate = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (task) => {
    setTaskToDelete(task);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async (taskData) => {
    if (editingTask) {
      return await updateTask(editingTask.id, taskData);
    } else {
      return await createTask(taskData);
    }
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete.id);
      setIsDeleteOpen(false);
      setTaskToDelete(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Overview</h1>
          <p className="text-gray-400">Manage your tasks and track your productivity.</p>
        </div>
        <Button onClick={handleOpenCreate} className="px-5">
          <Plus size={20} />
          <span className="hidden sm:inline">New Task</span>
        </Button>
      </div>

      <StatsPanel stats={stats} />
      
      <TaskFilters 
        currentStatus={statusFilter}
        onStatusChange={setStatusFilter}
        currentSort={sortOption}
        onSortChange={setSortOption}
      />

      <div className="flex-1 min-h-[300px]">
        {loading && tasks.length === 0 ? (
          <div className="flex-center h-full">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : tasks.length > 0 ? (
          <TaskList 
            tasks={tasks} 
            onEdit={handleOpenEdit} 
            onDelete={handleOpenDelete} 
          />
        ) : (
          <EmptyState 
            title="No tasks found" 
            description={statusFilter ? `You don't have any tasks marked as '${statusFilter.replace('_', ' ')}'.` : "Get started by creating your first task!"}
            action={
              <Button onClick={handleOpenCreate}>
                <Plus size={18} /> Add Task
              </Button>
            }
          />
        )}
      </div>

      <TaskForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingTask}
      />

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${taskToDelete?.title}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default Dashboard;
