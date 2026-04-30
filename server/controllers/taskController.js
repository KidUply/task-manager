const db = require('../config/database');

/**
 * Get all tasks for the authenticated user.
 * Supports query params: ?status=todo|in_progress|done&sort=deadline
 * GET /api/tasks
 */
exports.getTasks = (req, res) => {
  try {
    const { status, sort } = req.query;
    let query = 'SELECT * FROM tasks WHERE user_id = ?';
    const params = [req.user.id];

    // Optional status filter
    if (status && ['todo', 'in_progress', 'done'].includes(status)) {
      query += ' AND status = ?';
      params.push(status);
    }

    // Sort by deadline (nearest first) or by creation date (newest first)
    if (sort === 'deadline') {
      query += ' ORDER BY CASE WHEN deadline IS NULL THEN 1 ELSE 0 END, deadline ASC';
    } else {
      query += ' ORDER BY created_at DESC';
    }

    const tasks = db.prepare(query).all(...params);
    res.json({ tasks });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks.' });
  }
};

/**
 * Get a single task by ID (with ownership check).
 * GET /api/tasks/:id
 */
exports.getTask = (req, res) => {
  try {
    const task = db.prepare('SELECT * FROM tasks WHERE id = ? AND user_id = ?')
      .get(req.params.id, req.user.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    res.json({ task });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Failed to fetch task.' });
  }
};

/**
 * Create a new task.
 * POST /api/tasks
 * Body: { title, description?, status?, deadline? }
 */
exports.createTask = (req, res) => {
  try {
    const { title, description, status, deadline } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Task title is required.' });
    }

    // Validate status if provided
    const validStatuses = ['todo', 'in_progress', 'done'];
    const taskStatus = status && validStatuses.includes(status) ? status : 'todo';

    const result = db.prepare(`
      INSERT INTO tasks (user_id, title, description, status, deadline)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      req.user.id,
      title.trim(),
      (description || '').trim(),
      taskStatus,
      deadline || null
    );

    // Fetch and return the newly created task
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({ task });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Failed to create task.' });
  }
};

/**
 * Update an existing task (ownership check).
 * PUT /api/tasks/:id
 * Body: { title?, description?, status?, deadline? }
 */
exports.updateTask = (req, res) => {
  try {
    // Verify ownership
    const existing = db.prepare('SELECT * FROM tasks WHERE id = ? AND user_id = ?')
      .get(req.params.id, req.user.id);

    if (!existing) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    const { title, description, status, deadline } = req.body;

    // Validate status if provided
    const validStatuses = ['todo', 'in_progress', 'done'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be: todo, in_progress, or done.' });
    }

    // Update only provided fields, keep existing values for others
    const updatedTask = {
      title: title !== undefined ? title.trim() : existing.title,
      description: description !== undefined ? description.trim() : existing.description,
      status: status || existing.status,
      deadline: deadline !== undefined ? deadline : existing.deadline,
    };

    db.prepare(`
      UPDATE tasks
      SET title = ?, description = ?, status = ?, deadline = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ?
    `).run(
      updatedTask.title,
      updatedTask.description,
      updatedTask.status,
      updatedTask.deadline,
      req.params.id,
      req.user.id
    );

    // Fetch and return the updated task
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
    res.json({ task });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Failed to update task.' });
  }
};

/**
 * Delete a task (ownership check).
 * DELETE /api/tasks/:id
 */
exports.deleteTask = (req, res) => {
  try {
    const result = db.prepare('DELETE FROM tasks WHERE id = ? AND user_id = ?')
      .run(req.params.id, req.user.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    res.json({ message: 'Task deleted successfully.' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Failed to delete task.' });
  }
};

/**
 * Get task statistics for the authenticated user.
 * GET /api/tasks/stats/summary
 */
exports.getStats = (req, res) => {
  try {
    const stats = db.prepare(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN status = 'todo' THEN 1 ELSE 0 END) as todo,
        SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as in_progress,
        SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) as done
      FROM tasks
      WHERE user_id = ?
    `).get(req.user.id);

    res.json({ stats });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics.' });
  }
};
