// src/components/DatePicker.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DatePicker = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.tasks.selectedDate);

  const handleChange = (e) => {
    dispatch({ type: 'SELECT_DATE', payload: { date: e.target.value } });
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <label>Select a date: </label>
      <input
        type="date"
        value={new Date(selectedDate).toISOString().substr(0, 10)}
        onChange={handleChange}
      />
    </div>
  );
};

export default DatePicker;
