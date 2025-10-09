import React, { useRef, useState } from 'react';

const CharacterCounter = () => {
  const inputRef = useRef(null);           // Reference to the input element
  const [count, setCount] = useState(0);   // State to track character count

  const handleInput = () => {
    const length = inputRef.current.value.length;
    setCount(length);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Character Counter</h2>
      <input
        type="text"
        ref={inputRef}
        onInput={handleInput}
        placeholder="Type something..."
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <p>Characters: {count}</p>
    </div>
  );
};

export default CharacterCounter;
