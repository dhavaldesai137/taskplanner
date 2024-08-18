const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Create a new task
router.post('/', async (req, res) => {
  console.log('Incoming request:', req.body); // Log the request body for debugging
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    console.error('Error creating task:', err); // Log the error for debugging
    res.status(500).send({ error: 'Failed to create task' }); // Send a generic error message
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err); // Log the error for debugging
    res.status(500).send({ error: 'Failed to fetch tasks' });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }
    res.send(task);
  } catch (err) {
    console.error('Error updating task:', err); // Log the error for debugging
    res.status(500).send({ error: 'Failed to update task' });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }
    res.send(task);
  } catch (err) {
    console.error('Error deleting task:', err); // Log the error for debugging
    res.status(500).send({ error: 'Failed to delete task' });
  }
});

module.exports = router;
