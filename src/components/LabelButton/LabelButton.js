import { React } from "react";
/* Styles */
import "./LabelButton.css";

function LabelButton(props) {
  return (
    <button
      type={props.type}
      className={`label-button-${props.button_size}`}
      onClick={props.handleClick}
    > {props.button_size=== 'small' || props.button_size=== 'short-long' || props.button_size=== 'selected-test'? <p
        className={`label-text`}
        style={{ color: props.text_color, textAlign: "center", fontSize: '12px'}}
      >
        {props.label_text}
      </p>: <p
        className={`label-text`}
        style={{ color: props.text_color, textAlign: "center" }}
      >
        {props.label_text}
      </p>}
    </button>
  );
}

export default LabelButton;
