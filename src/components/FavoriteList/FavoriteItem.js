import "./FavoriteItem.css";

export default function FavoriteItem(props) {
  function handleDragStart(event) {
    props.onDragStart(event.target.src);
  }
  return (
    <div className="favorite-container" onClick={props.handleClick}>
      <img
        className="favorite-image"
        src={props.source}
        alt={`${props.title}`}
        draggable="true"
        onDragStart={handleDragStart}
      />

      <div className="favorite-overlay">
        <img
          className="favorite-delete"
          src="./icons/delete_favoriteItem_white.svg"
          alt="delete-icon"
          onClick={props.removeItemFromFavoriteList}
        />
        <p className="favorite-title-overlay">{props.title}</p>
      </div>
    </div>
  );
}
