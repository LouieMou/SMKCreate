import React,{useState, useEffect} from "react";
import {updateTimeTracking} from "../../database/Logging";

function Listener(props) {
  const [count, setCount] = useState(0);
 
  useEffect(() => {
    let intervalId;
    if (props.routeChange) {
      intervalId = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    }
    return () => {
    const timeAndPath = `path: ${props.routeChange} seconds:${count}`
    updateTimeTracking(timeAndPath).then(clearInterval(0));
    };
  }, [props.routeChange]);
  return <div></div>;
}

export default Listener;
