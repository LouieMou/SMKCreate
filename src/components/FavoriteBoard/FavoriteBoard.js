import { useState } from "react";
import "./FavoriteBoard.css";
import FavoriteGrid from "./FavoriteGrid";

export default function FavoriteBoard(props) {
  const [visible, setVisible] = useState(true);

  function closeFavoriteList() {
    setVisible(false);
  }

  return visible ? (
    <div className="favoriteBoard">
      <img
        className="cross"
        src="./icons/cross_black.svg"
        alt="close-icon"
        onClick={closeFavoriteList}
      />
      <FavoriteGrid list={props.list} /> {/* list from useContext here */}
    </div>
  ) : (
    ""
  );
}
