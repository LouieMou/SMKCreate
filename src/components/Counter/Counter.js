import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const handleButtonClick = () => {
    setIsRunning((prevState) => !prevState);
  };

  return (
    <div>
      <h1>Counter: {count} seconds</h1>
      <button onClick={handleButtonClick}>
        {isRunning ? 'Stop Counting' : 'Start Counting'}
      </button>
    </div>
  );
};

export default Counter;