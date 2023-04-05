import { useContext, useEffect } from "react";
/* Components */
import FavoriteItem from "./FavoriteItem";
/* Styles */
import "./FavoriteGrid.css";
import "./../../index.css";
/* Context */
import { FavoriteContext } from "../../context/FavoriteContext";

export default function FavoriteGrid(props) {
  const { favoriteList } = useContext(FavoriteContext);

  useEffect(() => {
    if (favoriteList) {
      console.log("my favoritegrid;", favoriteList);
    }
  }, [favoriteList]);

  function deleteItem(e) {
    console.log("clicked on remove");
    e.stopPropagation(); // prevent an event from triggering on parent elements of a DOM tree.
  }

  function onClickImage(obj) {
    console.log("click on image");
    /* obj.attributes.painting_pointer.id; */
  }

  return (
    <div className="favorite-grid">
      {favoriteList.length > 0 ? (
        favoriteList.map((obj, index) => {
          return (
            <FavoriteItem
              key={index}
              source={obj}
              title="item"
              handleClick={onClickImage}
              removeItemFromFavoriteList={deleteItem}
            />
          );
        })
      ) : (
        <div className="text-container">
          <p className="label-text-bold">
            Your favorite objects <br /> will be saved here
          </p>
          <p className="label-text">
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
