import "./CategoryItem.css";

export default function CategoryItem(props) {
  return (
    <div className="img-container">
      <div className="overlay">
        <img
          src={props.source}
          alt={`${props.labelName}`}
          onClick={props.handleClick}
        />
      </div>
    </div>
  );
}
