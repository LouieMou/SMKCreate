import { React } from "react";
/* Styles */
import "./LabelButton.css";

function LabelButtonPainting(props) {

  return (
    <button
      type={props.type}
      className={`label-button-${props.button_size}`}
      onClick={props.handleClick}
      onMouseEnter={props.handleOnMouseEnter}
      onMouseLeave={props.handleOnMouseLeave}
    >
      <p
        className={`label-text`}
        style={{ color: props.text_color, textAlign: "center" }}
      >
        {props.label_text}
      </p>
    </button>
  );
}
export default LabelButtonPainting;