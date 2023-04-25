import { useNavigate } from "react-router-dom";
/* Components */
import ImageItem from "../ImageItem/ImageItem";
/* Styles */
import "./ImageGrid.css";

export default function ImageGrid(props) {
  const navigate = useNavigate();

  function onClickImage(paintingId) {
    navigate("/painting", { state: { paintingId } });
  }

  return (
    <div className="image-grid">
      {props.list.map((obj, index) => {
        if (obj.object_url !== "")
          return (
            <ImageItem
              key={index}
              source={obj.object_url}
              title={obj.label_text}
              object={obj}
              handleClick={() => onClickImage(obj.painting_id)}
            />
          );
      })}
    </div>
  );
}
