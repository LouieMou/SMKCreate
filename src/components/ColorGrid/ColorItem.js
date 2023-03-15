import "./ColorItem.css";

export default function ColorItem(props) {
  return (
    <div
      className="color-item"
      style={{ backgroundColor: `${props.color}` }}
    ></div>
  );
}
