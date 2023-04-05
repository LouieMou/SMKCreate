import { useState, useContext } from "react";
/* Context */
import { FavoriteContext } from "../../context/FavoriteContext";
/* Styles */
import "./ImageItem.css";

export default function ImageItem(props) {
  const [fillHeart, setFillHeart] = useState(false);

  const { updateFavoriteList } = useContext(FavoriteContext);

  function handleSaveToFavorite(imgSource){
    updateFavoriteList(imgSource);
  }

  return (
    <div className="image-container" >
      <img className="image" src={props.source} alt={`${props.title}`} />
      <div className="overlay">
        <span
          className="favorite-icon-container"
          onMouseEnter={()=>setFillHeart(!fillHeart)}
          onMouseLeave={()=>setFillHeart(!fillHeart)}
        >
          {fillHeart ? (
            <img src="/icons/white_filled heart.svg"
            onClick={()=> handleSaveToFavorite(props.source)}></img>
          ) : (
            <img src="/icons/white_unfilled heart.svg"
            onClick={()=> handleSaveToFavorite(props.source)}></img>
          )}
        </span>
        <p className="text-overlay" onClick={props.handleClick} >{props.title}</p>
      </div>
    </div>
  );
}
