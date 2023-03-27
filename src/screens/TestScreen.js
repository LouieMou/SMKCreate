import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
/* Functions */
import { setBackgroundColor } from "../functions/background";
import { readPaintingById } from "../database/Painting";
import {readObjectsByPaintingId} from "../database/Object";
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
    console.log(state.obj)
  }, []);

   useEffect(() => {
    fetchObjects(state.obj)
  }, []);

  const [painting, setPainting] = useState();
  const [objects, setObjects] = useState();

  const yellow = getComputedStyle(document.documentElement).getPropertyValue(
    "--SMK-blue"
  );
  setBackgroundColor(yellow);

  let colorMode = "var(--primary-white)";

  async function fetchPainting(paintingId) {
    let painting = await readPaintingById(paintingId);
    setPainting(painting);
  }

  async function fetchObjects(paintingId) {
      try {
        const objects = await readObjectsByPaintingId(paintingId);
        setObjects(objects);
      } catch (error) {
        console.error(error);
      }
    }
  return (
    <>
      {painting ? (
        <div
          className="paintingScreen"
          style={{ backgroundColor: painting.suggested_bg_color }}
        >
          <>
          <MetaData
            data={painting}
            objects={painting.object_labels}
            colorMode={colorMode}
          />
          {objects ? <FullScreenImage
            imgURL={painting.image_thumbnail}
            imgWidth={painting.image_width}
            objects={objects}
            colorMode={colorMode}
          />
          : <></>}
          </>
        </div>
      ) : (
        "Loading"
      )}
    </>
  );
}

export default TestScreen;
