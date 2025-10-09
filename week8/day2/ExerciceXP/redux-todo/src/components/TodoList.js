import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo, removeTodo } from '../actions/todoActions';

const TodoList = ({ todos, toggleTodo, removeTodo }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>
        <span
          onClick={() => toggleTodo(todo.id)}
          style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
        >
          {todo.text}
        </span>
        <button onClick={() => removeTodo(todo.id)}>❌</button>
      </li>
    ))}
  </ul>
);

const mapStateToProps = state => ({
  todos: state.todos
});

export default connect(mapStateToProps, { toggleTodo, removeTodo })(TodoList);

