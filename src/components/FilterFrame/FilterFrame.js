import { React, useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
/* Components */
import LabelButton from "../LabelButton/LabelButton";
/* Functions */
import { readLabelsInCategory } from "../../database/Category";
/* Styles */
import "./FilterFrame.css";
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
  }

  function navigateToAllCategories() {
    navigate("/categories");
  }

  function resetFilter() {
    props.showAllObjectsInCategory();
    setSelectedLabelButton("all");
  }

  return (
    <div className="filter-frame-container">
      {category && category.length > 10 ? (
        <h1 style={{ fontSize: "33px" }}>{category}</h1>
      ) : (
        <h1>{category}</h1>
      )}
      <div className="filter-frame-button-container">
        {labelList ? (
          labelList.map((label, index) => (
            <LabelButton
              key={index}
              handleClick={() => updateFilter(label.objectLabel.toLowerCase())}
              label_text={label.objectLabel.toLowerCase()}
              button_size={
                label.objectLabel.toLowerCase() === selectedLabelButton
                  ? "selected"
                  : "standard"
              }
              text_color={
                label.objectLabel.toLowerCase() === selectedLabelButton
                  ? props.label_text_color
                  : "white"
              }
            />
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="filter-frame-allbuttons-container">
        <LabelButton
          handleClick={() => resetFilter()}
          label_text={"all " + props.category.toLowerCase()}
          button_size={"all" === selectedLabelButton ? "selected" : "standard"}
          text_color={
            "all" === selectedLabelButton ? props.label_text_color : "white"
          }
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
