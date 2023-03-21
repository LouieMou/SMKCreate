import "./../../index.css";
import "./MetaData.css";
import ColorGrid from "../ColorGrid/ColorGrid";
import HeadingFullScreen from "../Headings/HeadingFullScreen";
import LabelGrid from "../LabelButton/LabelGrid";

export default function MetaData(props) {
  return (
    <div className="metadata" style={{ color: props.colorMode }}>
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
      <ColorGrid colors={props.data.colors} colorMode={props.colorMode} />
    </div>
  );
}
