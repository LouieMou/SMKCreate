import { React, useEffect, useState } from "react";
/* Components */
import CustomScroller from "react-custom-scroller";
import LabelButton from "../LabelButton/LabelButton";
/* Functions */
import { readLabelList } from "../../database/Fruit";
/* Styles */
import "./FilterFrame.css";
import "../../index.css";

function FilterFrame(props) {
  useEffect(() => {
    updateLabelList().then(console.log("UseEffect has processed", labelList));
  }, []);

  let [labelList, setLabelList] = useState([]);

  async function updateLabelList() {
    try {
      let labels = await readLabelList();
      setLabelList(labels);
    } catch (error) {}
  }

  return (
    <div>
      <div className="filter-frame-container">
        <h1>Fruit</h1>
        <div className="filter-frame-button-container">
          <CustomScroller className="scroller">
            {labelList ? (
              labelList.map((label) => (
                <LabelButton key={label.id} label_text={label.attributes.object_label}/>
              ))
            ) : (
              <></>
            )}
          </CustomScroller>
        </div>
        <LabelButton label_text="all categories"/>
      </div>
    </div>
  );
}

export default FilterFrame;
