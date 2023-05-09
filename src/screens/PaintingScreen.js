import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
/* Functions */
import { setBackgroundColor } from "../functions/background";
import { readPaintingById } from "../database/Painting";
import { readObjectsByPaintingId } from "../database/Object";
/* Components */
import MetaData from "../components/MetaData/MetaData";
import FullScreenImage from "../components/FullScreenImage/FullScreenImage";
/* Styles */
import "../index.css";
import "./PaintingScreen.css";

export default function PaintingScreen(props) {
  const { state } = useLocation();
  useEffect(() => {
    fetchPainting(state.paintingId);
  }, []);

  useEffect(() => {
    fetchObjects(state.paintingId);
  }, []);

  const [painting, setPainting] = useState();
  const [objects, setObjects] = useState();

  let colorMode = "var(--primary-white)";

  async function fetchPainting(paintingId) {
    let painting = await readPaintingById(paintingId);
    setPainting(painting);
    setBackgroundColor(painting.suggested_bg_color);
    props.setBgColor(painting.suggested_bg_color);
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
      {painting && objects ? (
        <div className="paintingScreen">
          <>
            <MetaData
              painting={painting}
              objects={objects}
              colorMode={colorMode}
            />
            <FullScreenImage
              imgURL={painting.image_thumbnail}
              imgWidth={painting.image_width}
              imgHeight={painting.image_height}
              objects={objects}
              colorMode={colorMode}
              painting_id={painting.id}
            />
          </>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
