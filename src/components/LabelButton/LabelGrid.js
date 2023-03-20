import "./../../index.css";
import LabelButton from "./LabelButton";
import { useEffect, useState } from "react";
import { readObjectsFromSamePainting } from "./../../database/Fruit";

export default function LabelGrid(props) {
  useEffect(() => {
    findObjects().then(console.log("UseEffect has processed", objects));
  }, []);

  const [objects, setObjects] = useState([]);

  async function findObjects() {
    try {
      let objects = await readObjectsFromSamePainting(props.objectNumber);
      setObjects(objects);
    } catch (error) {}
  }

  return (
    <>
      <h4>Objects</h4>
      {objects
        ? objects.map((obj, index) => {
            return (
              <LabelButton key={index}>{obj.attributes.label_text}</LabelButton>
            );
          })
        : "Loading"}
    </>
  );
}
