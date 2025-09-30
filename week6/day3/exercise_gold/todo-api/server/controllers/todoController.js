const Todo = require('../models/todoModel');

const getAll = async (req, res) => {
  const todos = await Todo.getAllTodos();
  res.json(todos);
};

const getById = async (req, res) => {
  const todo = await Todo.getTodoById(req.params.id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
};

const create = async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const [newTodo] = await Todo.createTodo({ title });
  res.status(201).json(newTodo);
};

const update = async (req, res) => {
  const { title, completed } = req.body;
  const [updatedTodo] = await Todo.updateTodo(req.params.id, { title, completed });
  if (!updatedTodo) return res.status(404).json({ error: 'Todo not found' });
  res.json(updatedTodo);
};

const remove = async (req, res) => {
  const deleted = await Todo.deleteTodo(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Todo not found' });
  res.status(204).send();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
