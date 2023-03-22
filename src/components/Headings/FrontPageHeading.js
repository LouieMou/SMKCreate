import "./FrontPageHeading.css";
import "./../../index.css";

export default function FrontPageHeading(props) {
  const { color } = props;
  const textColor = {
    color: color || "black",
  };
  return (
    <div className="heading-container" style={textColor}>
      <h1>
        What would you <br /> like to explore?
      </h1>
      <h2>Choose a category</h2>
    </div>
  );
}
