import React, { useContext } from 'react';
import { TaskContext } from '../TaskContext';

const FilterButtons = () => {
  const { state, dispatch } = useContext(TaskContext);

  return (
    <div>
      <button
        onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}
        disabled={state.filter === 'all'}
      >
        All
      </button>
      <button
        onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}
        disabled={state.filter === 'active'}
      >
        Active
      </button>
      <button
        onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}
        disabled={state.filter === 'completed'}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterButtons;