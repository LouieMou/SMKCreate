import React, { useState, useRef, useEffect } from "react";
/*Styling*/
import "./CanvasScreen.css";
/* Components */
import TextBox from "../components/TextBox/TextBox";
import LabelButton from "../components/LabelButton/LabelButton";
import Canvas from "../components/Canvas/Canvas";
/* Functions */
import { setWhiteBackground } from "../functions/background";

function CanvasScreen(props) {
  const canvasRef = useRef(null);
  const [userInput, setUserInput] = useState("");

  setWhiteBackground();
  
  const handleUserInput = (event) => {
    setUserInput(event.target.value);
    console.log(event);
  };

  function generateImage() {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    context.fillStyle = "red";
    context.fillRect(0, 0, canvas.width, canvas.height);
    console.log(canvas);
  }

  const downLoadImage = () => {
    console.log("I downloaded my image");
  };

  function clearCanvas() {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function openFavoriteList() {
    console.log("Open favorite list");
  }

  return (
    <div className="canvas-screen-container">
      <Canvas id="canvas" canvasRef={canvasRef}>
        <div className="favoriteList-button-container">
          <LabelButton
            button_size={"large"}
            label_text={"Open Favorite List"}
            handleClick={() => openFavoriteList()}
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
            handleClick={() => generateImage()}
          />
        </div>
        <div className="download-image-button-container">
          <LabelButton
            button_size={"large"}
            label_text={"Download"}
            handleClick={() => downLoadImage()}
          />
        </div>
        <div className="clear-canvas-button">
          <LabelButton
            button_size={"large"}
            label_text={"Clear Canvas"}
            handleClick={() => clearCanvas()}
          />
        </div>
      </div>
    </div>
  );
}

export default CanvasScreen;
