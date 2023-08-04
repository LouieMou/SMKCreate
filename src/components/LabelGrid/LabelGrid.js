import { useEffect, useState, useContext } from "react";
import { useNavigate, generatePath } from "react-router-dom";
/* Components */
import LabelButton from "../LabelButton/LabelButton";
import LabelButtonPainting from "../LabelButton/LabelButtonPainting";
import ImageMapper from "react-img-mapper";
/* Context */
import { SearchContext } from "../../context/SearchContext";
/* Functions */
import { sortByUniqueObjectLabels } from "../../functions/reducing";
import {renderAreas} from "../../functions/mapper"
import {scaleCoords} from "../../functions/mapper";
import {computeCenter} from "../../functions/mapper";
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
    console.log(uniqueLabelsArr)
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

  function handleMouseEnterArea(obj) {
    const scaled_coords = scaleCoords(obj.attributes.coords, props.scale);
   
    const object = {
      key: obj.id,
      coords: obj.attributes.coords,
      shape: "poly",
      category_id: obj.attributes.category_id,
      name: obj.attributes.category_pointer.attributes.category_name,
      label_text: obj.attributes.label_text,
      fillColor: "hsla(240, 3%, 6%, 0.66)",
      object_url: obj.attributes.object_url,
      fillHeart: false,
      painting_id: props.painting_id,
      artist: obj.attributes.painting_pointer.attributes.artist,
      title: obj.attributes.painting_pointer.attributes.title,
      scaledCoords: scaled_coords, 
      center: computeCenter(scaled_coords, "poly")
    };
    console.log("this is the labelbutton;", object)

    props.setHoverArea(object);
  }

  return (
    <div className="label-grid-container">
      <h4>Objects</h4>
      <div className="label-grid">
        {uniqueLabels
          ? uniqueLabels.map((obj, index) => {
              return (
                <div
                  className="label-grid-space"
                  key={index}
                >
                  <LabelButtonPainting
                    label_text={obj.attributes.label_text}
                    button_size={"standard"}
                    handleClick={() => handleClick(obj)}
                    handleOnMouseEnter={() => handleMouseEnterArea(obj)}
                    handleOnMouseLeave={() => props.setHoverArea(null)}
                  />
                </div>
              );
            })
          : "Loading"}
      </div>
    </div>
  );
}
