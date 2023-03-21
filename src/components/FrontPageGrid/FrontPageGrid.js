import ImageItem from "../ImageItem/ImageItem";
import "./FrontPageGrid.css";

export default function FrontPageGrid(props) {
  const imagesToDisplay = props.data.slice(0, 9);
  return (
    <div className="frontpage-grid">
      {imagesToDisplay.map((obj, index) => {
        return (
          <ImageItem
            key={index}
            source={obj.object_url}
            title={obj.label_name}
          />
        );
      })}
    </div>
  );
}
