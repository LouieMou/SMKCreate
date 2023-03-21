import "./LabelGrid.css";
import LabelButton from "./LabelButton";
import { useEffect, useState } from "react";

export default function LabelGrid(props) {
  const [uniqueLabels, setUniqueLabels] = useState([]);

  useEffect(() => {
    checkUniqueLabels();
  }, []);

  function checkUniqueLabels() {
    const uniqueLabels = new Set();
    props.objects.forEach((element) => {
      let obj = element.attributes.label_text;
      uniqueLabels.add(obj);
    });
    let uniqueLabelsArr = Array.from(uniqueLabels);
    setUniqueLabels(uniqueLabelsArr);
  }

  return (
    <>
      <h4>Objects</h4>
      <div className="label-grid">
        {uniqueLabels
          ? uniqueLabels.map((obj, index) => {
              return <LabelButton key={index}>{obj}</LabelButton>;
            })
          : "Loading"}
      </div>
    </>
  );
}
