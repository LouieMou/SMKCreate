import { useContext } from "react";
/* Context */
import { FavoriteContext } from "../../context/FavoriteContext";
/* Styles */
import "./ImageItem.css";

export default function ImageItem(props) {
  const { updateFavoriteList, removeFromFavoriteList } =
    useContext(FavoriteContext);

  function handleSaveToFavorite(object) {
    object.saved = true;
    updateFavoriteList(object);
    console.log("this is the object:", object);
  }

  function handleRemoveFromFavorite(object) {
    object.saved = false;
    removeFromFavoriteList(object.id);
  }

  return (
    <div className="image-container">
      <img className="image" src={`/${props.source}`} alt={`${props.title}`} />
      <span className="favorite-icon-container">
        {props.object.saved && (
          <img
            src="/icons/heart_filled_white.svg"
            onClick={() => handleRemoveFromFavorite(props.object)}
            alt="icon"
          ></img>
        )}
      </span>
      <div className="overlay">
        <span className="favorite-icon-container">
          {props.object.saved ? (
            <img
              src="/icons/heart_filled_white.svg"
              onClick={() => handleRemoveFromFavorite(props.object)}
              alt="icon"
            ></img>
          ) : (
            <img
              src="/icons/heart_unfilled_white.svg"
              onClick={() => handleSaveToFavorite(props.object)}
              alt="icon"
            ></img>
          )}
        </span>
        <div className="object-text-overlay">
          <p className="text-overlay" onClick={props.handleClick}>
            {"See painting by " + props.artist}
          </p>
          <p className="text-overlay-see-painting"></p>
        </div>
      </div>
    </div>
  );
}
