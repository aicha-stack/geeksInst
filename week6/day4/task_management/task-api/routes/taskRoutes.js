const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const filePath = path.join(__dirname, '..', 'tasks.json');
const loadTasks = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
};
const saveTasks = (tasks) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error(err);
  }
};
router.get('/', (req, res) => {
  const tasks = loadTasks();
  res.json(tasks);
});
router.get('/:id', (req, res) => {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});
router.post('/', (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  const tasks = loadTasks();
  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    description: description || '',
  };
  tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json({ message: 'Task created', task: newTask });
});
router.put('/:id', (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  const tasks = loadTasks();
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Task not found' });

  tasks[index] = { id: tasks[index].id, title, description };
  saveTasks(tasks);
  res.json({ message: 'Task updated', task: tasks[index] });
});
router.delete('/:id', (req, res) => {
  const tasks = loadTasks();
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Task not found' });

  const deleted = tasks.splice(index, 1);
  saveTasks(tasks);
  res.json({ message: 'Task deleted', task: deleted[0] });
});

module.exports = router;
