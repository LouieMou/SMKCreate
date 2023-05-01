/* Styles */
import "./../../index.css";

export default function HeadingFullScreen(props) {
  return (
    <>
      <h3>{props.artist}</h3>
      <h1>{props.title}</h1>
      <h5>
        {props.year ? props.year + "," : ""} {props.techniques}
      </h5>
    </>
  );
}
