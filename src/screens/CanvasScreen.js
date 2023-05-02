import React, { useState, useRef, useEffect } from "react";
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
  const [metaDataOnLayer, setMetaDataOnLayer] = useState([]);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [loading, setLoading] = useState(false);
  const [referencesIsShown, setReferencesIsShown] = useState(false);
  const stageRef = useRef(null);
  const dragURL = useRef();
  const divRef = useRef();

  useEffect(() => {
    if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
      setDimensions({
        width: divRef.current.offsetWidth - 20,
        height: divRef.current.offsetHeight - 20,
      });
    }
  }, []);

  useEffect(() => {
    console.log("metaDataOnLayer: ", metaDataOnLayer);
  }, [metaDataOnLayer]);

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
    let hasCanvasContent = imagesOnLayer.length !== 0;

    if (!hasUserInput) {
      alert("You need to write a text in the input field");
    }

    if (!hasCanvasContent) {
      alert("You need to drag some objects to the canvas");
    }

    if (hasUserInput && hasCanvasContent) {
      setLoading(true);
      const konvaDataURL = stageRef.current.toDataURL();
      const response = await fetch(konvaDataURL);
      const blob = await response.blob();

      try {
        const form = new FormData();
        form.append("image", blob, "image.png");
        form.append("prompt", userInput);
        form.append("n", "1");
        form.append("size", `${dimensions.width}x${dimensions.height}`);

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

        setImagesOnLayer([
          {
            x: centerX,
            y: centerY,
            src: generatedImageURL,
            id: Date.now().toString(),
          },
        ]);
        setReferencesIsShown(true);
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
          link.setAttribute(`${userInput}`, filename);
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
    setReferencesIsShown(false);
    setUserInput("");
  }

  return (
    <div className="canvas-screen-container">
      <div className="fav-grid-container">
        <FavoriteGrid
          closeFavoriteList={props.closeFavoriteList}
          dragURL={dragURL}
          setMetaDataOnLayer={setMetaDataOnLayer}
          metaDataOnLayer={metaDataOnLayer}
        />
      </div>
      <Konva
        dragURL={dragURL}
        stageRef={stageRef}
        divRef={divRef}
        dimensions={dimensions}
        imagesOnLayer={imagesOnLayer}
        setImagesOnLayer={setImagesOnLayer}
        loading={loading}
      />
      <div className="generate-image-container">
        <TextBox
          placeholder="Write some text here to help generate an image"
          value={userInput}
          onChange={handleUserInput}
        />
        {referencesIsShown && (
          <div className="references">
            <p className="references-title">
              {metaDataOnLayer.length > 1
                ? "This artwork is generated using the following objects:"
                : "This artwork is generated using the following object:"}
            </p>
            {metaDataOnLayer.map((obj, index) => (
              <p key={index} className="artist-and-title-references">
                <span style={{ fontWeight: "bold" }}>{obj.label_text}</span>{" "}
                from <span style={{ fontStyle: "italic" }}>{obj.title}</span> by{" "}
                {obj.artist}
              </p>
            ))}
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
              button_size={"canvas-small"}
              label_text={"Clear"}
              handleClick={clearCanvas}
            />
            <LabelButton
              button_size={"canvas-small"}
              label_text={"Download"}
              handleClick={downloadImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CanvasScreen;
