/* Components */
import ColorItem from "./ColorItem";
/* Styles */
import "./../../index.css";
import "./ColorItem.css";

export default function ColorGrid(props) {
  const colorString = props.colors.replaceAll(`'`, `"`);
  const colorArray = JSON.parse(colorString);

  return (
    <div className="colorgrid">
      <h4 className="color-heading">Colors</h4>
      {colorArray.map((c, index) => {
        return <ColorItem color={c} key={index} colorMode={props.colorMode} />;
      })}
    </div>
  );
}
