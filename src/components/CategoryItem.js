import "./CategoryItem.css";

export default function CategoryItem(props) {
  return (
    <div className="image-container">
      <img
        className="image"
        src={props.source}
        alt={`${props.labelName}`}
        onClick={props.handleClick}
      />
      <div className="overlay">
        <p className="text-overlay">{props.labelName}</p>
      </div>
    </div>
  );
}
