import React from 'react';
import { useDispatch } from 'react-redux';
import { selectDate } from '../actions/taskActions';

export default function DateSelector() {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const selected = new Date(e.target.value).toDateString();
    dispatch(selectDate(selected));
  };

  return (
    <div>
      <input type="date" onChange={handleChange} />
    </div>
  );
}
