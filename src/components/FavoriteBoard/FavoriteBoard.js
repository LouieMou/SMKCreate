import "./FavoriteBoard.css";
import FavoriteGrid from "./FavoriteGrid";

export default function FavoriteBoard(props) {
  return (
    <div className="favoriteBoard">
      <div className="cross-container">
        <img
          className="cross"
          src="./icons/cross_black.svg"
          alt="close-icon"
          onClick={props.closeFavoriteList}
        />
      </div>
      <FavoriteGrid />
    </div>
  );
}
