import { React } from "react";
/* Styles */
import "./LabelButton.css";

function LabelButton(props) {
  return (
    <button
      type={props.type}
      className={`label-button-${props.button_size}`}
      onClick={props.handleClick}
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

export default LabelButton;
