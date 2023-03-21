import "./LabelGrid.css";
import LabelButton from "./LabelButton";

export default function LabelGrid(props) {
  return (
    <>
      <h4>Objects</h4>
      <div className="label-grid">
        {props.objects
          ? props.objects.map((obj, index) => {
              return (
                <LabelButton key={index}>
                  {obj.attributes.label_text}
                </LabelButton>
              );
            })
          : "Loading"}
      </div>
    </>
  );
}
