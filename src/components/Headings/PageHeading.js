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
      <h2>{props.subtitle}</h2>
    </div>
  );
}
