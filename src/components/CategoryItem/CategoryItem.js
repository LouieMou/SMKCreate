/* Styles */
import "./CategoryItem.css";

export default function CategoryItem(props) {
  return (
    <div className="category-frame" onClick={props.handleClick}>
      <div className="category-images">
        <img src={props.source1} alt={`${props.title}1`} />
        <img src={props.source2} alt={`${props.title}2`} />
        <img src={props.source3} alt={`${props.title}3`} />
      </div>
      <p>{props.title}</p>
    </div>
  );
}
