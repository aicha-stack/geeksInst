import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  categories: [
    { id: 'work', name: 'Work' },
    { id: 'personal', name: 'Personal' },
  ],
  selectedCategory: 'work',
};

const trackerSlice = createSlice({
  name: 'tracker',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: nanoid(),
        text: action.payload.text,
        category: action.payload.category,
        completed: false,
      });
    },
    editTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) {
        task.text = action.payload.text;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  toggleComplete,
  setCategory,
} = trackerSlice.actions;

export default trackerSlice.reducer;
