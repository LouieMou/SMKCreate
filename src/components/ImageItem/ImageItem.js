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
  }

  function handleRemoveFromFavorite(object) {
    object.saved = false;
    removeFromFavoriteList(object.id);
  }

  function handleUpperCase(label_text){
    const result = label_text.charAt(0).toUpperCase() + label_text.slice(1);
    return result;
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
          <p className="text-overlay" onClick={props.handleClick}>
            { handleUpperCase(props.object.label_text)  + " by " + props.artist}
          </p>
      </div>
    </div>
  );
}
