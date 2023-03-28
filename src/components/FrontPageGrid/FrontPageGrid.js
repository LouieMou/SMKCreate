import { React, useEffect, useState } from "react";
import ImageItem from "../ImageItem/ImageItem";
import { useNavigate } from "react-router-dom";
/* Styles */
import "./FrontPageGrid.css";

export default function FrontPageGrid(props) {
  useEffect(() => {
    console.log(props.data);
  }, []);

  const imagesToDisplay = props.data.slice(0, 9);
  const navigate = useNavigate();
  function onClickImage(obj) {
    navigate("/search", { state: { obj } });
    console.log(`I clicked on the object`);
  }
  return (
    <div className="frontpage-grid">
      {imagesToDisplay.map((category, index) => {
        return (
          <ImageItem
            key={index}
            source={category.img_url}
            title={category.name}
            handleClick={() => onClickImage(category)}
          />
        );
      })}
    </div>
  );
}
