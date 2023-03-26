import { React, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
/* Components */
import CustomScroller from "react-custom-scroller";
import LabelButton from "../LabelButton/LabelButton";
/* Functions */
import { readLabelList } from "../../database/Fruit";
import { readLabelsInCategory } from "../../database/Category";
/* Styles */
import "./FilterFrame.css";
import "../../index.css";
/* Context */
import {FilterContext} from '../../context/FilterContext';

function FilterFrame(props) {
  useEffect(() => {
    updateLabelList().then(console.log("Labels have been read", labelList));
  }, []);

  const [filter, setFilter ] = useContext(FilterContext)
 
  const navigate = useNavigate();
  let [labelList, setLabelList] = useState([]);
  const [category, setCategory] = useState();

  async function updateLabelList() {
    try {
      setCategory(props.category);
      let labels = await readLabelsInCategory(props.category);
      setLabelList(labels);
    } catch (error) {}
  }

  function updateFilter(object_label){
    setFilter(object_label)
    console.log("Filter has been updated", object_label)
  }

  function navigateToHome(){
    navigate("/");
  }

  return (
    <div>
      <div className="filter-frame-container">
        <h1>{category}</h1>
        <div className="filter-frame-button-container">
          <CustomScroller className="scroller">
            {labelList ? (
              labelList.map((label, index) => (
                <LabelButton key={index} handleClick={()=>updateFilter(label.objectLabel)} label_text={label.objectLabel}/>
              ))
            ) : (
              <></>
            )}
          </CustomScroller>
        </div>
        <LabelButton handleClick={()=>navigateToHome()} label_text="all categories"/>
      </div>
    </div>
  );
}

export default FilterFrame;
