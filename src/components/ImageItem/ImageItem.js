import "./ImageItem.css";

export default function ImageItem(props) {
  return (
    <div className="image-container">
      <img
        className="image"
        src={props.source}
        alt={`${props.labelName}`}
        onClick={props.handleClick}
      />
      <div className="overlay">
        <p className="text-overlay">{props.title}</p>
      </div>
    </div>
  );
}
