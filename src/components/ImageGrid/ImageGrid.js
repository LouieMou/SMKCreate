import { useNavigate } from "react-router-dom";
/* Components */
import ImageItem from "../ImageItem/ImageItem";
/* Styles */
import "./ImageGrid.css";

export default function ImageGrid(props) {
  const navigate = useNavigate()
  function onClickImage(paintingId) {
    navigate("/test", {state: {paintingId}});
  }

  return (
    <div className="image-grid">
      {props.objects.map((obj, index) => {
        return (
          <ImageItem
            key={index}
            source={obj.attributes.object_url}
            title={obj.attributes.label_text}
            handleClick={() => onClickImage(obj.attributes.painting_pointer.id)}
          />
        );
      })}
    </div>
  );
}
