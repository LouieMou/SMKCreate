import React from "react";
import { useEffect, useState } from "react";
/* Functions */
import { setBackgroundColor } from "../functions/background";
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
      console.log("Fetching objects...");
      try {
        const objects = await readObjectsFromSamePainting(
          data[2].object_number
        );
        console.log("Objects fetched:", objects);
        setObjects(objects);
      } catch (error) {
        console.error(error);
      }
    }
    fetchObjects();
  }, []);

  return (
    <div
      className="paintingScreen"
      style={{ backgroundColor: data[2].suggested_bg_color }}
    >
      {objects.length > 0 ? (
        <>
          <MetaData data={data[2]} objects={objects} />
          <FullScreenImage
            imgURL={data[2].image_thumbnail}
            imgWidth={data[2].image_width}
            objects={objects}
          />
        </>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default PaintingScreen;
