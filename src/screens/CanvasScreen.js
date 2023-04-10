import React, { useState, useRef } from "react";
/*Styling*/
import "./CanvasScreen.css";
/* Components */
import TextBox from "../components/TextBox/TextBox";
import LabelButton from "../components/LabelButton/LabelButton";
import Canvas from "../components/Canvas/Canvas";
/* Functions */
import { setBackgroundColor } from "../functions/background";

function CanvasScreen(props) {
  const canvasRef = useRef(null);
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");

  const [userInput, setUserInput] = useState("");

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
    console.log(event);
  };

  const generateImage = () => {
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    context.fillStyle = "red";
    context.fillRect(0, 0, canvas.width, canvas.height);
    console.log(canvas);
  };

  const downLoadImage = () => {
    console.log("I downloaded my image");
  };

  const clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const white = getComputedStyle(document.documentElement).getPropertyValue(
    "--primary-white"
  );
  setBackgroundColor(white);
  return (
    <div className="canvas-screen-container">
      <Canvas id="canvas" canvasRef={canvasRef}>
        <div className="favoriteList-button-container">
          <LabelButton
            button_size={"large"}
            label_text={"Open Favorite List"}
            handleClick={downLoadImage}
          />
        </div>
      </Canvas>

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
            handleClick={generateImage}
          />
        </div>
        <div className="download-image-button-container">
          <LabelButton
            button_size={"large"}
            label_text={"Download"}
            handleClick={downLoadImage}
          />
        </div>
        <div className="clear-canvas-button">
          <LabelButton
            button_size={"large"}
            label_text={"Clear Canvas"}
            handleClick={clearCanvas}
          />
        </div>
      </div>
    </div>
  );
}

export default CanvasScreen;
