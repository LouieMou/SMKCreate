/* Components */
import ColorGrid from "../ColorGrid/ColorGrid";
import HeadingFullScreen from "../Headings/HeadingFullScreen";
import LabelGrid from "../LabelGrid/LabelGrid";
import InformationLink from "../InformationLink/InformationLink";
/* Styles */
import "./../../index.css";
import "./MetaData.css";

export default function MetaData(props) {
  const text = "For more information click here";
  const SMKUrl = "https://open.smk.dk/artwork/image/";
  function handleNavigationToSMK(paintingId) {
    window.open(SMKUrl + paintingId, "_blank");
  }

  return (
    <div className="metadata" style={{ color: props.colorMode }}>
      <HeadingFullScreen
        artist={props.painting.artist}
        x
        title={props.painting.title}
        year={props.painting.publication_year}
        techniques={props.painting.techniques}
      />
      <LabelGrid objects={props.objects} setHoverArea={props.setHoverArea} scale={props.scale}/>
      <ColorGrid colors={props.painting.colors} colorMode={props.colorMode} />
      <InformationLink
        className="information-link"
        handleClick={() => handleNavigationToSMK(props.painting.painting_id)}
        text={text}
      ></InformationLink>
    </div>
  );
}
