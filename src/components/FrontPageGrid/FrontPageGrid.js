import { React, useContext, useEffect } from "react";
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
      {props.data.map((item, index) => {
        return (
          <ImageItem
            key={index}
            source={item.object.object_url}
            title={item.category.name}
            handleClick={() => handleClick(item.category)}
            object={item.object}
          />
        );
      })}
    </div>
  );
}
