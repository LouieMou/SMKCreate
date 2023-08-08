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
      <p className="h1-front-page">{props.title}</p>
      <h2 style={{fontSize: "30px", lineHeight: "40px"}}>{props.subtitle}</h2>
    </div>
  );
}