import React, { useState } from "react";
/*Styling*/
import "./CanvasScreen.css";
/* Components */
import PageHeading from "../components/Headings/PageHeading";
import TextBox from "../components/TextBox/TextBox";
import LabelButton from "../components/LabelButton/LabelButton";
/* Functions */
import { setBackgroundColor } from "../functions/background";

function CanvasScreen(props) {
  const [userInput, setUserInput] = useState("");
  const handleUserInput = (event) => {
    setUserInput(event.target.value);
    console.log(event);
  };

  const generateImage = () => {
    if (userInput !== "") {
      console.log(userInput);
    } else {
      console.log("I just clicked the button");
    }
  };

  const downLoadImage = () => {
    console.log("I downloaded my image");
  };

  const clearCanvas = () => {
    console.log("I cleared the canvas");
  };

  const white = getComputedStyle(document.documentElement).getPropertyValue(
    "--primary-white"
  );
  setBackgroundColor(white);
  return (
    <div className="canvas-screen-container">
      <PageHeading
        title="This is the Canvas Screen"
        subtitle="Design and data will soon be updated"
      />

      <div className="generate-image-container">
        <TextBox
          placeholder="Write some text here to start generating an image"
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
