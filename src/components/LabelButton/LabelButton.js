import { React } from "react";
/* Styles */
import "./LabelButton.css";

function LabelButton(props) {
  return (
    <div>
      <span className={`label-button-${props.button_size}`} onClick={props.handleClick}>
        <p className="label-text">{props.label_text}</p>
      </span>
    </div>
  );
}

export default LabelButton;
