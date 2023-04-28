import React, { useState, useRef } from "react";
import axios from "axios";
/*Styling*/
import "./CanvasScreen.css";
/* Components */
import TextBox from "../components/TextBox/TextBox";
import LabelButton from "../components/LabelButton/LabelButton";
import Konva from "../components/Canvas/Konva";
import FavoriteGrid from "../components/FavoriteList/FavoriteGrid";
/* Functions */
import { setBackgroundColor } from "../functions/background";
import FormData from "form-data"; //imported from the openai library (needed)

function CanvasScreen(props) {
  const [userInput, setUserInput] = useState("");
  const [imagesOnLayer, setImagesOnLayer] = useState([]);
  const stageRef = useRef(null);
  const dragURL = useRef();

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

        const generatedImageURL = response.data.data[0].url;

        setImagesOnLayer([
          {
            x: 256,
            y: 256,
            src: generatedImageURL,
            id: Date.now().toString(),
          },
        ]);
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

  function downloadURL(url) {
    fetch(url)
      .then((response) => {
        const filename = response.headers
          .get("content-disposition")
          .split("=")[1];
        return response.blob().then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function downloadImage() {
    /*     if (generatedImageURL !== "") {
      downloadURL(generatedImageURL);
    } else { */
    const png = stageRef.current.toDataURL();
    downloadURI(png, `image.png`);
  }

  function clearCanvas() {
    setImagesOnLayer([]);
  }

  return (
    <div className="canvas-screen-container">
      <div className="fav-grid-container">
        <FavoriteGrid
          closeFavoriteList={props.closeFavoriteList}
          dragURL={dragURL}
        />
      </div>
      <Konva
        dragURL={dragURL}
        stageRef={stageRef}
        imagesOnLayer={imagesOnLayer}
        setImagesOnLayer={setImagesOnLayer}
      />
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
            handleClick={clearCanvas}
          />
        </div>
      </div>
    </div>
  );
}

export default CanvasScreen;
