import React from "react";
import "./LabelButton.css";

function LabelButton({children}) {
  return (
    <div>
      <span
        className="label-button"
        onClick={() => {
          console.log("Button has been clicked");
        }}
      >
        <p className="label-text">{children}</p>
      </span>
    
    </div>
  );
}

export default LabelButton;
