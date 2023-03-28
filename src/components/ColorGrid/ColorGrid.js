import "./../../index.css";
import ColorItem from "./ColorItem";

export default function ColorGrid(props) {
  
  const colorString = props.colors.replaceAll(`'`, `"`);
  const colorArray =  JSON.parse(colorString);
 
  return (
    <>
      <h4>Colors</h4>
      {colorArray.map((c, index) => {
        return <ColorItem color={c} key={index} colorMode={props.colorMode} />;
      })}
    </>
  );
}
