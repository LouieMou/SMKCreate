import ImageItem from "../ImageItem/ImageItem";
import { useNavigate } from "react-router-dom";
/* Styles */
import "./FrontPageGrid.css";

export default function FrontPageGrid(props) {
  const imagesToDisplay = props.data.slice(0, 9);
  const navigate = useNavigate();
  function onClickImage() {
    navigate("/search");
    console.log(`I clicked on the object`);
  }
  return (
    <div className="frontpage-grid">
      {imagesToDisplay.map((obj, index) => {
        return (
          <ImageItem
            key={index}
            source={obj.object_url}
            title={obj.label_name}
            handleClick={()=>onClickImage()}
          />
        );
      })}
    </div>
  );
}
