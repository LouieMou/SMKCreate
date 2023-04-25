import React, { useState, useRef } from "react";
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
  const [generatedImage, setGeneratedImage] = useState();
  const stageRef = useRef(null);

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
    console.log(event);
  };

  const white = getComputedStyle(document.documentElement).getPropertyValue(
    "--primary-white"
  );
  setBackgroundColor(white);

  function generateImage() {
    console.log("generate Image");
    const png = stageRef.current.toDataURL();
    console.log("I think a png: ", png);

    /* get some data from the server */
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setGeneratedImage(data.message));
  }

  const downLoadImage = () => {
    /*     console.log("I downloaded my image"); */
  };

  function clearCanvas() {
    /*     const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height); */
  }

  function openFavoriteList() {
    /*     console.log("Open favorite list"); */
  }

  return (
    <div className="canvas-screen-container">
      <Konva dragURL={props.dragURL} stageRef={stageRef} />
      <p>{!generatedImage ? "Loading..." : generatedImage}</p>
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
