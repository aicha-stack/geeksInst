export const selectDate = (date) => ({
  type: 'SELECT_DATE',
  payload: { date },
});

export const addTask = (date, task) => ({
  type: 'ADD_TASK',
  payload: { date, task },
});

export const editTask = (date, index, task) => ({
  type: 'EDIT_TASK',
  payload: { date, index, task },
});

export const deleteTask = (date, index) => ({
  type: 'DELETE_TASK',
  payload: { date, index },
});

