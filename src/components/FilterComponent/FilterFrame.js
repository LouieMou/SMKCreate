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
    updateList().then(console.log("UseEffect has processed", labelList));
  }, []);

  let [labelList, setLabelList] = useState([]);

  async function updateList() {
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
                <LabelButton key={label.id}>
                  {label.attributes.object_label}
                </LabelButton>
              ))
            ) : (
              <></>
            )}
          </CustomScroller>
        </div>
        <LabelButton>all categories</LabelButton>
      </div>
    </div>
  );
}

export default FilterFrame;
