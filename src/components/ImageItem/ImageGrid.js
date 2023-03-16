import ImageItem from "./ImageItem";
import "./ImageGrid.css";

export default function ImageGrid(props) {
  function onClickImage(title) {
    console.log(`I clicked on ${title}`);
  }

  return (
    <div className="image-grid">
      {props.data.map((obj, index) => {
        return (
          <ImageItem
            key={index}
            source={obj.object_url}
            title={obj.label_name}
            handleClick={() => onClickImage(obj.label_name)}
          />
        );
      })}
    </div>
  );
}
