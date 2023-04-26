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

  function generateText() {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setGeneratedImage(data.message));
  }

  async function generateImage() {
    console.log("generate Image");
    const png = stageRef.current.toDataURL();
    //console.log("I think a png: ", png);

    //console.log(png_Manuel);
    /* say to the server that it should sent a request to dall-e and send back the answer*/
    /*  fetch("/api")
      .then((res) => res.json())
      .then((data) => setGeneratedImage(data.message)); 
      */

    const response = await fetch("/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "Make a background of bananas",
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("response: ", responseData.generatedImage);
      setGeneratedImage(responseData.generatedImage);
      /* stageRef.current = responseData.resultImage; */
    } else {
      console.log("Failed to generate image: ", response.status);
    }
  }

  function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function downloadImage() {
    const png = stageRef.current.toDataURL();
    downloadURI(png, "stage.png");
  }

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
      {generatedImage ? (
        <img
          src={generatedImage}
          style={{ height: "512px", width: "512px" }}
          alt="generatedImage"
        />
      ) : (
        <></>
      )}
      <Konva dragURL={props.dragURL} stageRef={stageRef} />

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
            handleClick={downloadImage}
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
