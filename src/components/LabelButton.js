import React from "react";
import "./LabelButton.css";

function LabelButton({children}) {
  return (
    <div>
      <button
        className="label-button"
        onClick={() => {
          console.log("Button has been clicked");
        }}
      >
        <p className="label-text">{children}</p>
      </button>
    
    </div>
  );
}

export default LabelButton;
