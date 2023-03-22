import {React, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
/* Functions */
import {setBackgroundColor} from '../functions/background';
/* Styles */
import '../index.css'

function TestScreen(props) {
    const {state} = useLocation();
    useEffect(() => {
    console.log("Painting screen state has processed: ", state);
  }, []);
    const yellow = getComputedStyle(document.documentElement).getPropertyValue('--SMK-blue')
    setBackgroundColor(yellow);
    return (
        <div>
            <h1>Artist: {state.obj.artist}</h1>
            <img style={{width: "400px", height:"400px"}} src={state.obj.image_thumbnail} />
        </div>
    );
}

export default TestScreen;