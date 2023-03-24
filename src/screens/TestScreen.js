import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
/* Functions */
import { setBackgroundColor } from "../functions/background";
import { readPaintingById } from "../database/Painting";
import { hexToHSL } from "./../functions/hexToHSL";
/* Components */
import MetaData from "./../components/Fullscreen/MetaData";
import FullScreenImage from "../components/Fullscreen/FullScreenImage";
/* Styles */
import "../index.css";
import "./PaintingScreen.css";

function TestScreen(props) {
  const { state } = useLocation();
  useEffect(() => {
    fetchPainting(state.obj);
  }, []);

  const [painting, setPainting] = useState();

  const yellow = getComputedStyle(document.documentElement).getPropertyValue(
    "--SMK-blue"
  );
  setBackgroundColor(yellow);

  let colorMode = "var(--primary-white)";

  async function fetchPainting(paintingId) {
    let painting = await readPaintingById(paintingId);
    console.log("Trying to get data", painting);
    setPainting(painting);
  }
  return (
    <div>
      {painting ? (
        <div>
          <div
            className="paintingScreen"
            style={{ backgroundColor: painting.suggested_bg_color }}
          ></div>
          <MetaData
            data={painting}
            objects={painting.object_labels}
            colorMode={colorMode}
          />
          <FullScreenImage
            imgURL={painting.image_thumbnail}
            imgWidth={painting.image_width}
            objects={painting.object_labels}
            colorMode={colorMode}
          />
          {/* <p> {painting.artist} </p>
          <h1>Artist: {state.obj.label_text}</h1>
          <img
            style={{ width: "400px", height: "400px" }}
            src={painting.image_thumbnail}
          /> */}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TestScreen;
