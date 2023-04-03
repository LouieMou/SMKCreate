import { React, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
/* Components */
import CustomScroller from "react-custom-scroller";
import LabelButton from "../LabelButton/LabelButton";
/* Functions */
import { readLabelsInCategory } from "../../database/Category";
/* Styles */
import "./FilterFrame.css";
import "../../index.css";
/* Context */

function FilterFrame(props) {
  useEffect(() => {
    updateLabelList();
  }, []);
 
  const navigate = useNavigate();
  let [labelList, setLabelList] = useState([]);
  const [category, setCategory] = useState();

  async function updateLabelList() {
    try {
      setCategory(props.category);
      let labels = await readLabelsInCategory(props.category);
      setLabelList(labels);
      console.log("This is the labelList: ", labelList);
    } catch (error) {}
  }

  function updateFilter(object_label){
    props.setFilter(object_label)
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
