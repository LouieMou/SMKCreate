import React from 'react';
/* Functions */
import {setBackgroundColor} from '../functions/background';
/* Styles */
import '../index.css'

function PaintingScreen(props) {
    const yellow = getComputedStyle(document.documentElement).getPropertyValue('--SMK-blue')
    setBackgroundColor(yellow);
    return (
        <div>
            
        </div>
    );
}

export default PaintingScreen;