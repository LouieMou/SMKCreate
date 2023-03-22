import {React, useContext} from "react";
/* Styles */
import "./LabelButton.css";
/* Context */
import {FilterContext} from '../../context/FilterContext';

function LabelButton(props) {
  const [filter, setFilter ] = useContext(FilterContext)

  return (
    <div>
      <span
        className="label-button"
        onClick={() => {
          setFilter(props.label_text);
        }}
      >
        <p className="label-text">{props.label_text}</p>
      </span>
    
    </div>
  );
}

export default LabelButton;
