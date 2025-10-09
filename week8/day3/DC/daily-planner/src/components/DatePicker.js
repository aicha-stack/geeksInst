// src/components/DatePicker.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDate } from '../features/tasks/tasksSlice';

const DatePicker = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(state => state.tasks.selectedDate);

  const handleChange = (e) => {
    dispatch(selectDate(e.target.value));
  };

  return (
    <input type="date" value={selectedDate} onChange={handleChange} />
  );
};

export default DatePicker;
