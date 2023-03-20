import "./../../index.css";
import ColorItem from "./ColorItem";

export default function ColorGrid(props) {
  return (
    <>
      <h4>Colors</h4>
      {props.colors.map((c, index) => {
        return <ColorItem color={c} key={index} />;
      })}
    </>
  );
}
