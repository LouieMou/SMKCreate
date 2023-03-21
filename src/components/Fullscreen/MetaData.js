import "./../../index.css";
import "./MetaData.css";
import { hexToHSL } from "../../functions/hexToHSL";
import ColorGrid from "../ColorGrid/ColorGrid";
import HeadingFullScreen from "../Headings/HeadingFullScreen";
import LabelGrid from "../LabelButton/LabelGrid";

export default function MetaData(props) {
  let hslColor = hexToHSL(props.data.suggested_bg_color);
  console.log("hsl", hslColor);
  let lightness = hslColor.l;

  let colorMode =
    lightness > 0.5 ? "var(--primary-white)" : "var(--primary-black)";

  return (
    <div className="metadata" style={{ color: colorMode }}>
      <HeadingFullScreen
        artist={props.data.artist}
        title={props.data.title}
        year={props.data.year}
        techniques={props.data.techniques}
      />
      <LabelGrid
        objects={props.objects}
        objectNumber={props.data.object_number}
      />
      <ColorGrid colors={props.data.colors} colorMode={colorMode} />
    </div>
  );
}
