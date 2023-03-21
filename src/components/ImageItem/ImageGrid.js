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
            source={obj.attributes.object_url}
            title={obj.attributes.label_text}
            handleClick={() => onClickImage(obj.attributes.label_text)}
          />
        );
      })}
    </div>
  );
}
