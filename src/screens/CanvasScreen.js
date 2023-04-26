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
/* import * as fs from "fs"; */

function CanvasScreen(props) {
  const [userInput, setUserInput] = useState("");
  const [dataURL, setDataURL] = useState("");
  const stageRef = useRef(null);
  const [generatedImage, setGeneratedImage] = useState("");

  class CustomFormData extends FormData {
    getHeaders() {
      return {};
    }
  }

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_KEY,
    formDataCtor: CustomFormData,
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
    console.log("userinput", userInput);

    if (userInput === "") {
      alert("You need to write a text in the input field");
    }

    const konvaWithObjects = stageRef.current.toDataURL();

    /*   const imageParameters = new CustomFormData();
    imageParameters.append("image", "/dalle/collage.png");
    imageParameters.append("prompt", userInput);
    imageParameters.append("n", 1);
    imageParameters.append("size", "512x512"); */

    /*     const imageParameters = {
      image: fs.createReadStream("/dalle/collage.png"),
      prompt: userInput,
      n: 1,
      size: "512x512",
    }; */

    /*       image: "/dalle/collage.png", */

    const stream = `ReadStream {
      _readableState: ReadableState {
        objectMode: false,
        highWaterMark: 65536,
        buffer: BufferList { length: 0 },
        length: 0,
        pipes: null,
        pipesCount: 0,
        flowing: null,
        ended: false,
        endEmitted: false,
        reading: false,
        sync: true,
        needReadable: false,
        emittedReadable: false,
        readableListening: false,
        resumeScheduled: false,
        paused: true,
        emitClose: true,
        autoDestroy: false,
        destroyed: false,
        defaultEncoding: 'utf8',
        awaitDrain: 0,
        readingMore: false,
        decoder: null,
        encoding: null
      },
      _events: [Object: null prototype] { end: [Function: onReadableStreamEnd] },
      _eventsCount: 1,
      _maxListeners: undefined,
      path: '/dalle/collage.png',
      fd: null,
      flags: 'r',
      mode: 438,
      start: undefined,
      end: Infinity,
      autoClose: true,
      pos: undefined,
      bytesRead: 0,
      closed: false
    }`;

    const imageParameters = {
      image: stream,
      prompt: userInput,
      n: 1,
      size: "512x512",
    };

    const response = await openai.createImage(imageParameters);
    const imageFromOpenAI = response.data.data[0].url;
    console.log(imageFromOpenAI);
    setGeneratedImage(imageFromOpenAI);
    stageRef.current = imageFromOpenAI;
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

  function openFavoriteList() {
    /*     console.log("Open favorite list"); */
  }

  return (
    <div className="canvas-screen-container">
      {/*       <img
        src="/dalle/collage.png"
        style={{ width: "512px", height: "512px" }}
        alt="generatedImage"
      /> */}
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
