import React from "react";
import { useEffect, useState } from "react";
/* Functions */
import { hexToHSL } from "./../functions/hexToHSL";
import { readObjectsFromSamePainting } from "./../database/Fruit";
/* Styles */
import "./../index.css";
import "./PaintingScreen.css";
/* Components */
import MetaData from "./../components/Fullscreen/MetaData";
import FullScreenImage from "../components/Fullscreen/FullScreenImage";

import data from "./../data/data.json";

function PaintingScreen(props) {
  const [objects, setObjects] = useState([]);

  /* I'm missing the objectNumber I need from props from previous page */
  /* props.objectNumber */
  useEffect(() => {
    async function fetchObjects() {
      try {
        const objects = await readObjectsFromSamePainting(
          data[2].object_number
        );
        setObjects(objects);
      } catch (error) {
        console.error(error);
      }
    }
    fetchObjects();
  }, []);

  let hslColor = hexToHSL(data[2].suggested_bg_color);
  let lightness = hslColor.l;

  let colorMode =
    lightness > 0.5 ? "var(--primary-white)" : "var(--primary-black)";

  return (
    <div
      className="paintingScreen"
      style={{ backgroundColor: data[2].suggested_bg_color }}
    >
      {objects.length > 0 ? (
        <>
          <MetaData data={data[2]} objects={objects} colorMode={colorMode} />
          <FullScreenImage
            imgURL={data[2].image_thumbnail}
            imgWidth={data[2].image_width}
            objects={objects}
            colorMode={colorMode}
          />
        </>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default PaintingScreen;
