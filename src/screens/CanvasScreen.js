import React, { useState, useRef } from "react";
import axios from "axios";
/*Styling*/
import "./CanvasScreen.css";
/* Components */
import TextBox from "../components/TextBox/TextBox";
import LabelButton from "../components/LabelButton/LabelButton";
import Konva from "../components/Canvas/Konva";
/* Functions */
import { setBackgroundColor } from "../functions/background";
import FormData from "form-data"; //imported from the openai library (needed)

function CanvasScreen(props) {
  const [userInput, setUserInput] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const stageRef = useRef(null);

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const white = getComputedStyle(document.documentElement).getPropertyValue(
    "--primary-white"
  );
  setBackgroundColor(white);

  async function generateImage() {
    console.log("inside generateImage function");

    let hasUserInput = userInput !== "";
    // this will never be empty (needs to be fixed) -> needs to listen to imagesOnLayer-array
    let hasCanvasContent = stageRef.current.toDataURL() !== "";

    if (!hasUserInput) {
      alert("You need to write a text in the input field");
    }

    if (!hasCanvasContent) {
      alert("You need to add some objects to the canvas");
    }

    if (hasUserInput && hasCanvasContent) {
      const konvaDataURL = stageRef.current.toDataURL();
      const response = await fetch(konvaDataURL);
      const blob = await response.blob();

      try {
        const form = new FormData();
        form.append("image", blob, "image.png");
        form.append("prompt", userInput);
        form.append("n", "1");
        form.append("size", "512x512");

        const response = await axios.post(
          "https://api.openai.com/v1/images/edits",
          form,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
            },
          }
        );

        const generatedImage = response.data.data[0].url;
        console.log(generatedImage);
        setGeneratedImage(generatedImage);
        stageRef.current = generatedImage;
      } catch (error) {
        console.log("Error in the generate:", error.message);
      }
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
    downloadURI(png, "KonvaWithObjects.png");
  }

  function clearCanvas() {
    /*     const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height); */
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
