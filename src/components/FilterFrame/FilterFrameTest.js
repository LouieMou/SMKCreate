import { React, useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
/* Components */
import LabelButton from "../LabelButton/LabelButton";
/* Functions */
import { readLabelsInCategory } from "../../database/Category";
import {updateAppliedFilters} from "../../database/Logging";
/* Styles */
import "./FilterFrameTest.css";
import "../../index.css";

function FilterFrame(props) {
  const { state } = useLocation();
  const navigate = useNavigate();
  let [labelList, setLabelList] = useState([]);
  const [category, setCategory] = useState();
  const [selectedLabelButton, setSelectedLabelButton] = useState(null);

  const memoizedUpdateLabelList = useCallback(async () => {
    try {
      setCategory(props.category);
      let labels = await readLabelsInCategory(props.category);
      setLabelList(labels);
    } catch (error) {}
  }, [props.category]);

  useEffect(() => {
    memoizedUpdateLabelList();
  }, [memoizedUpdateLabelList]);

  useEffect(() => {
    if (state) {
      setSelectedLabelButton(state.filter);
    }
  }, [state]);

  function updateFilter(label_text) {
    props.setFilter(label_text);
    setSelectedLabelButton(label_text);

    const filter_and_category_database = {
      label_filter: label_text, 
      category: props.category
    }
    
    updateAppliedFilters(filter_and_category_database);
  }

  function navigateToAllCategories() {
    navigate("/categories");
  }

  function resetFilter() {
    props.showAllObjectsInCategory();
    setSelectedLabelButton("all");
  }

  return (
   <div className="contain-all-filters-test">
      <div className="filter-frame-button-container-test">
        {labelList ? (
          labelList.map((label, index) => (
            <div className="filter-frame-space-between-button">
            <LabelButton
              key={index}
              handleClick={() => updateFilter(label.objectLabel.toLowerCase())}
              label_text={label.objectLabel.toLowerCase()}
              button_size={
                label.objectLabel.toLowerCase() === selectedLabelButton
                  ? "selected-test"
                  : "small"
              }
              text_color={
                label.objectLabel.toLowerCase() === selectedLabelButton
                  ? props.label_text_color
                  : "white"
              }
            />
            </div>
          ))
        ) : (
          <></>
        )}
        <div className="filter-frame-space-between-button">
        <LabelButton
          handleClick={() => resetFilter()}
          label_text={"all " + props.category.toLowerCase()}
          button_size={"all" === selectedLabelButton ? "selected-test" : "short-long"}
          text_color={
            "all" === selectedLabelButton ? props.label_text_color : "white"
          }
        />
        </div>
        <LabelButton
          handleClick={() => navigateToAllCategories()}
          label_text="all categories"
          button_size={"short-long"}
        />
      </div>
      <div className="filter-frame-button-container-test">
        
      </div>
    </div>
  );
}

export default FilterFrame;