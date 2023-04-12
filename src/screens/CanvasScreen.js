import React, { useState, useRef, useEffect } from "react";
/*Styling*/
import "./CanvasScreen.css";
/* Components */
import TextBox from "../components/TextBox/TextBox";
import LabelButton from "../components/LabelButton/LabelButton";
import Konva from "../components/Canvas/Konva";
/* Functions */
import { setBackgroundColor } from "../functions/background";

function CanvasScreen(props) {
  const [userInput, setUserInput] = useState("");

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
    console.log(event);
  };

  const white = getComputedStyle(document.documentElement).getPropertyValue(
    "--primary-white"
  );
  setBackgroundColor(white);
  return (
    <div className="canvas-screen-container">
      <Konva dragURL={props.dragURL} />
      <div className="generate-image-container">
        <TextBox
          placeholder="Write some text here to help generate an image"
          value={userInput}
          onChange={handleUserInput}
        />
        <div className="label-button-container">
          <LabelButton
            button_size={"large"}
            label_text={"Generate Image"}
            // handleClick={() => generateImage()}
          />
        </div>
        <div className="download-image-button-container">
          <LabelButton
            button_size={"large"}
            label_text={"Download"}
            //handleClick={() => downLoadImage()}
          />
        </div>
        <div className="clear-canvas-button">
          <LabelButton
            button_size={"large"}
            label_text={"Clear Canvas"}
            //handleClick={() => clearCanvas()}
          />
        </div>
      </div>
    </div>
  );
}

export default CanvasScreen;
