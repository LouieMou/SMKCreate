import "./FavoriteGrid.css";
import FavoriteItem from "./FavoriteItem";

export default function FavoriteGrid(props) {
  function deleteItem(e) {
    console.log("clicked on remove");
    e.stopPropagation(); // prevent an event from triggering on parent elements of a DOM tree.
    /* jeg er ikke sikker på om denne function skal være her, 
            eller et andet sted, men hvis jeg har adgang til context favorite-list 
            er det måske fint? */
  }

  function onClickImage(obj) {
    console.log("click on image");
    /* obj.attributes.painting_pointer.id; */
  }

  return (
    <div className="favorite-grid">
      {props.list.map((obj, index) => {
        return (
          <FavoriteItem
            key={index}
            source={obj}
            title="item"
            handleClick={onClickImage}
            removeItemFromFavoriteList={deleteItem}
          />
        );
      })}
    </div>
  );
}
