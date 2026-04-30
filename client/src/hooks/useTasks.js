import { useState, useCallback } from 'react';
import api from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async (status = '', sort = 'created_at') => {
    setLoading(true);
    try {
      const res = await api.get('/tasks', { params: { status, sort } });
      setTasks(res.data.tasks);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const res = await api.get('/tasks/stats/summary');
      setStats(res.data.stats);
    } catch (err) {
      console.error('Failed to fetch stats', err);
    }
  }, []);

  const createTask = async (taskData) => {
    try {
      const res = await api.post('/tasks', taskData);
      setTasks(prev => [res.data.task, ...prev]);
      fetchStats();
      return { success: true, task: res.data.task };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Failed to create task' };
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const res = await api.put(`/tasks/${id}`, updates);
      setTasks(prev => prev.map(t => t.id === id ? res.data.task : t));
      fetchStats();
      return { success: true, task: res.data.task };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Failed to update task' };
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(t => t.id !== id));
      fetchStats();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Failed to delete task' };
    }
  };

  return {
    tasks,
    stats,
    loading,
    error,
    fetchTasks,
    fetchStats,
    createTask,
    updateTask,
    deleteTask
  };
};
