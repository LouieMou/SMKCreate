import "./LabelGrid.css";
import LabelButton from "./LabelButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LabelGrid(props) {
  const [uniqueLabels, setUniqueLabels] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    checkUniqueLabels();
  }, []);

  function checkUniqueLabels() {
    const uniqueLabels = new Set();
    props.objects.forEach((o) => {
      let obj = o;
      uniqueLabels.add(obj);
    });
    let uniqueLabelsArr = Array.from(uniqueLabels);
    setUniqueLabels(uniqueLabelsArr);
  }

  function handleClick(){
    navigate("/search")
  }

  return (
    <>
      <h4>Objects</h4>
      <div className="label-grid">
        {uniqueLabels
          ? uniqueLabels.map((obj, index) => {
              return <LabelButton key={index} label_text={obj} handleClick={()=>handleClick()}></LabelButton>;
            })
          : "Loading"}
      </div>
    </>
  );
}
