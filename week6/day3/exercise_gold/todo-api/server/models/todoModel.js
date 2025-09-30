const db = require('../config/db');

const getAllTodos = () => db('tasks');

const getTodoById = (id) => db('tasks').where({ id }).first();

const createTodo = (todo) => db('tasks').insert(todo).returning('*');

const updateTodo = (id, updatedTodo) => 
  db('tasks').where({ id }).update(updatedTodo).returning('*');

const deleteTodo = (id) => db('tasks').where({ id }).del();

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
