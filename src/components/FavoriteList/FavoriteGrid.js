import { useContext } from "react";
import { useNavigate } from "react-router-dom";
/* Components */
import FavoriteItem from "./FavoriteItem";
/* Styles */
import "./FavoriteGrid.css";
import "./../../index.css";
/* Context */
import { FavoriteContext } from "../../context/FavoriteContext";

export default function FavoriteGrid(props) {
  const navigate = useNavigate();
  const { favoriteList, removeFromFavoriteList } = useContext(FavoriteContext);

  function deleteItem(id, e) {
    removeFromFavoriteList(id);
    e.stopPropagation(); // prevent an event from triggering on parent elements of a DOM tree.
  }

  function onClickImage(paintingId) {
    navigate("/painting", { state: { paintingId } });
    props.closeFavoriteList();
  }

  return (
    <div className="favorite-grid">
      {favoriteList.length > 0 ? (
        favoriteList.map((obj, index) => {
          return (
            <FavoriteItem
              key={index}
              source={obj.object.object_url}
              title={obj.object.label_text}
              handleClick={() => onClickImage(obj.object.painting_id)}
              removeItemFromFavoriteList={(e) => deleteItem(obj.object.id, e)}
            />
          );
        })
      ) : (
        <div className="text-container">
          <p className="label-text-bold">
            Your favorite objects <br /> will be saved here
          </p>
          <p className="label-text-favorite">
            Explore the collection and discover the objects that inspire you the
            most. Don't forget to save your favorites for later, so you can use
            them as inspiration for your own creative artwork. <br />
            <br />
            Happy exploring!
          </p>
        </div>
      )}
    </div>
  );
}
