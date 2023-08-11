/* Styles */
import "./../../index.css";

export default function HeadingFullScreen(props) {
  return (
    <>
      <h3>{props.artist}</h3>
      <h1>{props.title}</h1>
      <div className="technique-and-info">
      <h5 style={{fontStyle: 'italic'}}>
        {props.year ? props.year + "," : ""} {props.techniques}
      </h5>
      </div>
    </>
  );
}
