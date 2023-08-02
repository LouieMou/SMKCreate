import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// FUNCTIONS
import { setTimeAndPath } from '../../database/Logging';

function TimeTracker (props) {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(location);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    if (props.startCounter && prevLocation !== location) {
      const endTime = Date.now();
      const elapsedTime = Math.round((endTime - startTime) / 1000); // Convert to seconds
      // console.log(`Time spent on "${prevLocation.pathname}": ${elapsedTime} seconds`);
      setTimeAndPath(prevLocation.pathname, elapsedTime);      

      // Update previous location and start time for the new screen
      setPrevLocation(location);
      setStartTime(endTime);
    }
  }, [prevLocation, location, startTime]);

  return null; // This component doesn't render anything visible
};

export default TimeTracker;