import React from 'react';
import { setBackgroundColor } from "../functions/background";


function CanvasScreen(props) {

const blue = getComputedStyle(document.documentElement).getPropertyValue(
    "--SMK-blue"
  );
  setBackgroundColor(blue);
    return (
        <div>
            <p style={{marginLeft: 40}}>This is the Canvas Screen</p>  
        </div>
    );
}

export default CanvasScreen;