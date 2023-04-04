import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
/* Components */
import ImageItem from "../ImageItem/ImageItem";
/* Context */
import { SearchContext } from "../../context/SearchContext";
/* Styles */
import "./FrontPageGrid.css";

export default function FrontPageGrid(props) {
  const { setCategoryIdAndFilter } = useContext(SearchContext);
  const navigate = useNavigate();

  function handleClick(category) {
    navigate("/search");
    setCategoryIdAndFilter(category, undefined);
  }

  return (
    <div className="frontpage-grid">
      {props.data.map((category, index) => {
        return (
          <ImageItem
            key={index}
            source={category.img_url}
            title={category.name}
            handleClick={() => handleClick(category)}
          />
        );
      })}
    </div>
  );
}
