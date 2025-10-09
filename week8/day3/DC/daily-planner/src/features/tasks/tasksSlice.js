// src/features/tasks/tasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedDate: new Date().toISOString().slice(0, 10), // yyyy-mm-dd
  tasksByDate: {
    // "2025-07-02": [{ id: 1, text: "Task 1" }, ...]
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    selectDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    addTask: (state, action) => {
      const { date, text } = action.payload;
      if (!state.tasksByDate[date]) {
        state.tasksByDate[date] = [];
      }
      state.tasksByDate[date].push({
        id: Date.now(),
        text,
      });
    },
    editTask: (state, action) => {
      const { date, id, text } = action.payload;
      const tasks = state.tasksByDate[date];
      if (tasks) {
        const task = tasks.find(t => t.id === id);
        if (task) task.text = text;
      }
    },
    deleteTask: (state, action) => {
      const { date, id } = action.payload;
      const tasks = state.tasksByDate[date];
      if (tasks) {
        state.tasksByDate[date] = tasks.filter(t => t.id !== id);
      }
    },
  },
});

export const { selectDate, addTask, editTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
