import { useEffect, useState, useContext } from "react";
import { useNavigate, generatePath } from "react-router-dom";
/* Components */
import LabelButton from "../LabelButton/LabelButton";
/* Context */
import { SearchContext } from "../../context/SearchContext";
/* Functions */
import { sortByUniqueObjectLabels } from "../../functions/reducing";
/* Styles */
import "./LabelGrid.css";

export default function LabelGrid(props) {
  const [uniqueLabels, setUniqueLabels] = useState([]);
  const { setCategoryIdAndFilter } = useContext(SearchContext);

  const navigate = useNavigate();

  useEffect(() => {
    checkUniqueLabels();
  }, []);

  function checkUniqueLabels() {
    let uniqueLabelsArr = sortByUniqueObjectLabels(props.objects);
    setUniqueLabels(uniqueLabelsArr);
  }

  function handleClick(object) {
    let category = {
      id: object.attributes.category_id,
      name: object.attributes.category_pointer.attributes.category_name,
    };
    let filter = object.attributes.label_text;

    // Updating the SearchContext
    setCategoryIdAndFilter(category, filter);
    const path = generatePath("/search/:id", {
      id: category.name.toLowerCase(),
    });
    navigate(path, { state: { filter } });
  }

  return (
    <div className="label-grid-container">
      <h4>Objects</h4>
      <div className="label-grid">
        {uniqueLabels
          ? uniqueLabels.map((obj, index) => {
              return (
                <div className="label-grid-space">
                  <LabelButton
                    key={index}
                    label_text={obj.attributes.label_text}
                    button_size={"standard"}
                    handleClick={() => handleClick(obj)}
                  />
                </div>
              );
            })
          : "Loading"}
      </div>
    </div>
  );
}
