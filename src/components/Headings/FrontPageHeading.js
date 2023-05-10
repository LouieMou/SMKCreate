/* Styles */
import "./PageHeading.css";
import "./../../index.css";

export default function FrontPageHeading(props) {
  const { color } = props;
  const textColor = {
    color: color || "black",
  };

  return (
    <div className="heading-container" style={textColor}>
      <h1>{props.title}</h1>
      <h2 style={{fontSize: "30px", lineHeight: "40px"}}>{props.subtitle}</h2>
    </div>
  );
}