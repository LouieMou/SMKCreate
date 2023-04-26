import React, { useState, useRef } from "react";
/*Styling*/
import "./CanvasScreen.css";
/* Components */
import TextBox from "../components/TextBox/TextBox";
import LabelButton from "../components/LabelButton/LabelButton";
import Konva from "../components/Canvas/Konva";
/* Functions */
import { setBackgroundColor } from "../functions/background";
import { Configuration, OpenAIApi } from "openai";

function CanvasScreen(props) {
  const [userInput, setUserInput] = useState("");
  const stageRef = useRef(null);
  const [generatedImage, setGeneratedImage] = useState("");

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_KEY,
  });

  const openai = new OpenAIApi(configuration);
  delete configuration.baseOptions.headers["User-Agent"];

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const white = getComputedStyle(document.documentElement).getPropertyValue(
    "--primary-white"
  );
  setBackgroundColor(white);

  async function generateImage() {
    console.log("inside generateImage function");

    if (userInput === "") {
      alert("You need to write a text in the input field");
    }

    const imageParameters = {
      prompt: userInput,
      n: 1,
      size: "512x512",
    };

    const response = await openai.createImage(imageParameters);
    const urlData = response.data.data[0].url;
    console.log(urlData);
    setGeneratedImage(urlData);
    stageRef.current = urlData;
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
          style={{ width: "512px", height: "512px" }}
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
