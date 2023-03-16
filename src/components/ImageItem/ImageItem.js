import "./ImageItem.css";

export default function ImageItem(props) {
  return (
    <div className="image-container" onClick={props.handleClick}>
      <img className="image" src={props.source} alt={`${props.title}`} />
      <div className="overlay">
        <p className="text-overlay">{props.title}</p>
      </div>
    </div>
  );
}
