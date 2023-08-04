import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
/*Styling*/
import "./CanvasScreen.css";
/* Components */
import TextBox from "../components/TextBox/TextBox";
import LabelButton from "../components/LabelButton/LabelButton";
import Konva from "../components/Canvas/Konva";
import FavoriteGrid from "../components/FavoriteList/FavoriteGrid";
import Step from "../components/Step/Step";
import Overlay from "../components/Overlay/Overlay";
/* Functions */
import { setBackgroundColor } from "../functions/background";
import { FavoriteContext } from "../context/FavoriteContext";
import FormData from "form-data"; //imported from the openai library (needed)
import { picasso } from "../database/Picasso";
import { useNavigate } from "react-router-dom";
import { updateObjectNavCount } from "../database/Logging";
import { setSavedPrompt } from "../database/Logging";
import { setAppliedObjects } from "../database/Logging";

function CanvasScreen(props) {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [loading, setLoading] = useState(false);
  const stageRef = useRef(null);
  const dragURL = useRef();
  const dragId = useRef();
  const divRef = useRef();

  const navigate = useNavigate();

  const handleOpenOverlay = () => {
    props.handleOpenOverlay();
  };

  function handleNavigationClick(paintingId) {
    updateObjectNavCount();
    navigate("/painting", { state: { paintingId } });
  }

  const { favoriteList } = useContext(FavoriteContext);

  useEffect(() => {
    const white = getComputedStyle(document.documentElement).getPropertyValue(
      "--primary-white"
    );
    setBackgroundColor(white);
    props.setBgColor(white);
    if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
      setDimensions({
        width: divRef.current.offsetWidth - 20,
        height: divRef.current.offsetHeight - 20,
      });
    }
  }, []);

  const handleUserInput = (event) => {
    props.setUserInput(event.target.value);
  };

  async function generateImage() {
    console.log("inside generateImage function");
    // sending prompt and applied objects to the database
    setSavedPrompt(props.userInput);
    setAppliedObjects(props.metaDataOnLayer);

    let hasUserInput = props.userInput !== "";
    let hasCanvasContent = props.imagesOnLayer.length !== 0;

    if (!hasUserInput) {
      alert("You need to write a text in the input field");
    }

    if (!hasCanvasContent) {
      alert("You need to drag some objects to the canvas");
    }

    if (hasUserInput && hasCanvasContent) {
      setLoading(true);
      props.setGeneratedImage(true);
      const konvaDataURL = stageRef.current.toDataURL();
      const response = await fetch(konvaDataURL);
      const blob = await response.blob();

      const result = await picasso();

      try {
        const form = new FormData();
        form.append("image", blob, "image.png");
        form.append("prompt", props.userInput);
        form.append("n", "1");
        form.append("size", `${dimensions.width}x${dimensions.height}`);

        const response = await axios.post(
          "https://api.openai.com/v1/images/edits",
          form,
          {
            headers: {
              Authorization: `Bearer ${result}`,
            },
          }
        );

        const generatedImageURL = response.data.data[0].url;
        console.log("response: ", generatedImageURL);

        let centerX;
        let centerY;
        if (dimensions.width === 1024) {
          centerX = 512;
          centerY = 512;
        } else {
          centerX = 256;
          centerY = 256;
        }

        props.setImagesOnLayer([
          {
            x: centerX,
            y: centerY,
            src: generatedImageURL,
            id: Date.now().toString(),
            width: 0,
            height: 0,
          },
        ]);
        props.setReferencesIsShown(true);
      } catch (error) {
        console.log("Error in the generate:", error.message);
      } finally {
        setLoading(false);
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

  function navigateToCategoryPage() {
    navigate("/categories");
  }

  /*   function downloadURL(url) {
    fetch(url)
      .then((response) => {
        const filename = response.headers
          .get("content-disposition")
          .split("=")[1];
        return response.blob().then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(`${props.userInput}`, filename);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  } */

  function downloadImage() {
    /*     if (generatedImageURL !== "") {
      downloadURL(generatedImageURL);
    } else { */
    const png = stageRef.current.toDataURL();
    downloadURI(png, `image.png`);
  }

  function clearCanvas() {
    props.setImagesOnLayer([]);
    props.setReferencesIsShown(false);
    props.setUserInput("");
    props.setMetaDataOnLayer([]);
    props.setGeneratedImage(false);
  }

  return (
    <div className="canvas-screen-container">
      <div className="explore-container">
        <div className="fav-grid-container">
          <FavoriteGrid
            closeFavoriteList={props.closeFavoriteList}
            dragURL={dragURL}
            dragId={dragId}
            setMetaDataOnLayer={props.setMetaDataOnLayer}
            metaDataOnLayer={props.metaDataOnLayer}
          />
        </div>
        <div className="explore-button-container">
          <div className="explore-button">
            <LabelButton
              button_size={"canvas"}
              label_text={
                favoriteList.length > 0 ? "Keep exploring" : "Start exploring"
              }
              handleClick={navigateToCategoryPage}
            />
          </div>
          <div className="example-button">
            <LabelButton
              button_size={"canvas"}
              label_text={"Show Example"}
              handleClick={handleOpenOverlay}
            />
          </div>
        </div>
      </div>

      <Konva
        dragURL={dragURL}
        dragId={dragId}
        stageRef={stageRef}
        divRef={divRef}
        dimensions={dimensions}
        imagesOnLayer={props.imagesOnLayer}
        setImagesOnLayer={props.setImagesOnLayer}
        setMetaDataOnLayer={props.setMetaDataOnLayer}
        generatedImage={props.generatedImage}
        clearCanvas={clearCanvas}
        loading={loading}
      />
      <div className="generate-image-container">
        <TextBox
          placeholder='Write some text here to help generate an image e.g. "two cats drinking coffee in the sunset on Mars"'
          value={props.userInput}
          onChange={handleUserInput}
        />
        {props.referencesIsShown ? (
          <div className="references">
            <p className="references-title">
              {props.metaDataOnLayer.length > 1
                ? "This artwork is generated using the following objects:"
                : "This artwork is generated using the following object:"}
            </p>
            {props.metaDataOnLayer.map((obj, index) => (
              <p key={index} className="artist-and-title-references">
                <span
                  className="object-reference"
                  onClick={() => handleNavigationClick(obj.painting_id)}
                  style={{ fontWeight: "bold" }}
                >
                  {obj.label_text}
                </span>{" "}
                from <span style={{ fontStyle: "italic" }}>{obj.title}</span> by{" "}
                {obj.artist}
              </p>
            ))}
          </div>
        ) : (
          <div className="steps">
            <Step
              number="1"
              text="Collect objects and add to your favorite list."
              isCompleted={favoriteList.length > 0}
            />
            <Step
              number="2"
              text="Drag objects to the canvas from your favorite list."
              isCompleted={props.imagesOnLayer.length > 0}
            />
            <Step
              number="3"
              text="Write a text to help generate your full image."
              isCompleted={props.userInput.length > 0}
            />
            <Step
              number="4"
              text="Click 'Generate Image' to generate your own artwork with the help of AI."
              isCompleted={props.generatedImage}
            />
          </div>
        )}
        <div className="all-canvas-buttons-container">
          <LabelButton
            button_size={"canvas"}
            label_text={"Generate Image"}
            handleClick={generateImage}
          />

          <div className="small-canvas-buttons-container">
            <LabelButton
              button_size={"canvas"}
              label_text={"Clear"}
              handleClick={clearCanvas}
            />
            {/* <LabelButton
              button_size={"canvas-small"}
              label_text={"Download"}
              handleClick={downloadImage}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CanvasScreen;
