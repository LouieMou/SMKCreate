import { React, useEffect, useState, useCallback } from "react";
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
  const navigate = useNavigate();
  let [labelList, setLabelList] = useState([]);
  const [category, setCategory] = useState();

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

  function updateFilter(object_label) {
    props.setFilter(object_label);
  }

  function navigateToAllCategories() {
    navigate("/categories");
  }

  return (
    <div>
      <div className="filter-frame-container">
        <h1>{category}</h1>
        <div className="filter-frame-button-container">
          <CustomScroller className="scroller">
            {labelList ? (
              labelList.map((label, index) => (
                <LabelButton
                  key={index}
                  handleClick={() => updateFilter(label.objectLabel)}
                  label_text={label.objectLabel}
                  button_size={"standard"}
                />
              ))
            ) : (
              <></>
            )}
          </CustomScroller>
        </div>
        <LabelButton
          handleClick={() => props.showAllObjectsInCategory()}
          label_text={"all "+ props.category.toLowerCase()}
          button_size={"standard"}
        />
        <LabelButton
          handleClick={() => navigateToAllCategories()}
          label_text="all categories"
          button_size={"standard"}
        />
      </div>
    </div>
  );
}

export default FilterFrame;
