import { createSelector } from '@reduxjs/toolkit';

export const selectTasks = state => state.tracker.tasks;
export const selectCategories = state => state.tracker.categories;
export const selectSelectedCategory = state => state.tracker.selectedCategory;

export const selectTasksByCategory = createSelector(
  [selectTasks, selectSelectedCategory],
  (tasks, categoryId) => tasks.filter(task => task.category === categoryId)
);

export const selectCompletedTasks = createSelector(
  [selectTasks],
  tasks => tasks.filter(t => t.completed).length
);

export const selectCategoryById = createSelector(
  [selectCategories, (_, categoryId) => categoryId],
  (categories, id) => categories.find(c => c.id === id)
);
