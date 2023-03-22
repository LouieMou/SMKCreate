import { React, useEffect, useState, useContext } from "react";
/* Components */
import CustomScroller from "react-custom-scroller";
import LabelButton from "../LabelButton/LabelButton";
/* Functions */
import { readLabelList } from "../../database/Fruit";
/* Styles */
import "./FilterFrame.css";
import "../../index.css";
/* Context */
import {FilterContext} from '../../context/FilterContext';

function FilterFrame(props) {
  useEffect(() => {
    updateLabelList().then(console.log("UseEffect has processed", labelList));
  }, []);

  const [filter, setFilter ] = useContext(FilterContext)
  let [labelList, setLabelList] = useState([]);

  async function updateLabelList() {
    try {
      let labels = await readLabelList();
      setLabelList(labels);
    } catch (error) {}
  }

  function updateFilter(object_label){
    setFilter(object_label)
    console.log("Filter has been updated", object_label)
  }

  return (
    <div>
      <div className="filter-frame-container">
        <h1>Fruit</h1>
        <div className="filter-frame-button-container">
          <CustomScroller className="scroller">
            {labelList ? (
              labelList.map((label) => (
                <LabelButton key={label.id} handleClick={()=>updateFilter(label.attributes.object_label)} label_text={label.attributes.object_label}/>
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
