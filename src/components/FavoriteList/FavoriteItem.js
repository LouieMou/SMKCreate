import "./FavoriteItem.css";

export default function FavoriteItem(props) {
  return (
    <div
      className="favorite-container"
      onClick={props.handleClick}
      draggable="true"
      onDragStart={() => {
        props.dragURL.current = `/${props.object.object_url}`;
        props.setMetaDataOnLayer([...props.metaDataOnLayer, props.object]);
      }}
    >
      <img
        className="favorite-image"
        src={`/${props.object.object_url}`}
        alt={`${props.object.label_text}`}
      />

      <div className="favorite-overlay">
        <img
          className="favorite-delete"
          src={`/icons/delete_favoriteItem_white.svg`}
          alt="delete-icon"
          onClick={props.removeItemFromFavoriteList}
        />
        <p className="favorite-title-overlay">{props.object.label_text}</p>
      </div>
    </div>
  );
}
