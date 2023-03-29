import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* Components */
import LabelButton from "./LabelButton";
/* Functions */
import {sortByUniqueObjectLabels} from "../../functions/reducing";
/* Styles */
import "./LabelGrid.css";

export default function LabelGrid(props) {
  const [uniqueLabels, setUniqueLabels] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    checkUniqueLabels();
  }, []);

  function checkUniqueLabels() {
   /*  const uniqueLabels = new Set();
    props.objects.forEach((o) => {
      let obj = o;
      uniqueLabels.add(obj);
    });
    let uniqueLabelsArr = Array.from(uniqueLabels); */
    let uniqueLabelsArr = sortByUniqueObjectLabels(props.objects)
    setUniqueLabels(uniqueLabelsArr);
  }

  function handleClick(object){
    let obj = {
      id: object.attributes.category_id,
      name: object.attributes.category_pointer.attributes.category_name
    }

    navigate("/search", {state: {obj}})
  }

  return (
    <>
      <h4>Objects</h4>
      <div className="label-grid">
        {uniqueLabels
          ? uniqueLabels.map((obj, index) => {
              return <LabelButton key={index} label_text={obj.attributes.label_text} handleClick={()=>handleClick(obj)}></LabelButton>;
            })
          : "Loading"}
      </div>
    </>
  );
}
