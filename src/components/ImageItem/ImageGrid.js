import { useNavigate } from "react-router-dom";
/* Components */
import ImageItem from "./ImageItem";
/* Styles */
import "./ImageGrid.css";

export default function ImageGrid(props) {
  const navigate = useNavigate()
  function onClickImage(obj) {
    navigate("/test", {state: {obj}});
    console.log(`I clicked on the object`);
  }

  return (
    <div className="image-grid">
      {props.data.map((obj, index) => {
        return (
          <ImageItem
            key={index}
            source={obj.attributes.object_url}
            title={obj.attributes.label_text}
            handleClick={() => onClickImage(obj.attributes)}
          />
        );
      })}
    </div>
  );
}
