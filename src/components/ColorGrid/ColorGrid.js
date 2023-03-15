import "./../../index.css";
import ColorItem from "./ColorItem";
import { hexToHSL } from "../../functions/hexToHSL";

export default function ColorGrid(props) {
  let hslColor = hexToHSL(props.suggestedColor);
  let lightness = hslColor.l;

  let colorMode =
    lightness > 0.5 ? "var(--primary-white)" : "var(--primary-black)";

  return (
    <>
      <h4 style={{ color: colorMode }}>Colors</h4>
      {props.colors.map((c, index) => {
        return <ColorItem color={c} key={index} />;
      })}
    </>
  );
}
