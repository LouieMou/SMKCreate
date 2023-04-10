import { useState, useContext } from "react";
/* Context */
import { FavoriteContext } from "../../context/FavoriteContext";
/* Styles */
import "./ImageItem.css";

export default function ImageItem(props) {

  const { updateFavoriteList } = useContext(FavoriteContext);

  function handleSaveToFavorite(object) {
    console.log("this is the object being saved from imageGrid: ", object)
    object.saved = true;
    updateFavoriteList(object);
    
  }

  return (
    <div className="image-container">
      <img className="image" src={props.source} alt={`${props.title}`} />
      <div className="overlay">
        <span
          className="favorite-icon-container"
        >
          {props.object.saved ? (
            <img
              src="/icons/heart_filled_white.svg"
              /* onClick={() => handleSaveToFavorite(props.object)} */
            ></img>
          ) : (
            <img
              src="/icons/heart_unfilled_white.svg"
              onClick={() => handleSaveToFavorite(props.object)}
            ></img>
          )}
        </span>
        <p className="text-overlay" onClick={props.handleClick}>
          {props.title}
        </p>
      </div>
    </div>
  );
}
