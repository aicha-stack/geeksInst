import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCategories, setCategory, selectSelectedCategory } from '../features/tracker/trackerSlice';

export default function CategorySelector() {
  const categories = useSelector(selectCategories);
  const selected = useSelector(selectSelectedCategory);
  const dispatch = useDispatch();

  return (
    <select
      value={selected}
      onChange={e => dispatch(setCategory(e.target.value))}
    >
      {categories.map(c => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
