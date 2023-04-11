import "./FavoriteItem.css";

export default function FavoriteItem(props) {
  const deleteIcon = "../../public/icons/delete_favoriteItem_white.svg";
  return (
    <div className="favorite-container" onClick={props.handleClick}>
      <img
        className="favorite-image"
        src={`/${props.source}`}
        alt={`${props.title}`}
      />

      <div className="favorite-overlay">
        <img
          className="favorite-delete"
          src={`/icons/delete_favoriteItem_white.svg`}
          alt="delete-icon"
          onClick={props.removeItemFromFavoriteList}
        />
        <p className="favorite-title-overlay">{props.title}</p>
      </div>
    </div>
  );
}
