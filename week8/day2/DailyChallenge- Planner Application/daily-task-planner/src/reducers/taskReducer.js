// src/reducers/taskReducer.js

const initialState = {
  tasksByDate: {}
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK': {
      const { date, task } = action.payload;
      const existingTasks = state.tasksByDate[date] || [];
      return {
        ...state,
        tasksByDate: {
          ...state.tasksByDate,
          [date]: [...existingTasks, task]
        }
      };
    }
    // باقي الحالات (EDIT_TASK, DELETE_TASK...) تقدر تزيدهم هنا
    default:
      return state;
  }
};

export default taskReducer;
