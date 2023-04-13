/* Components */
import ColorGrid from "../ColorGrid/ColorGrid";
import HeadingFullScreen from "../Headings/HeadingFullScreen";
import LabelGrid from "../LabelGrid/LabelGrid";
/* Styles */
import "./../../index.css";
import "./MetaData.css";

export default function MetaData(props) {
  return (
    <div className="metadata" style={{ color: props.colorMode }}>
      <HeadingFullScreen
        artist={props.painting.artist}
        title={props.painting.title}
        year={props.painting.publication_year}
        techniques={props.painting.techniques}
      />
      <LabelGrid objects={props.objects} />
      <ColorGrid colors={props.painting.colors} colorMode={props.colorMode} />ª
    </div>
  );
}
