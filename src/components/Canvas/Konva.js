import "./Konva.css";
import { Stage, Layer } from "react-konva";
import KonvaImage from "./KonvaImage";
import KonvaText from "./KonvaText";

export default function Konva(props) {
  const handleOnDrop = (e) => {
    e.preventDefault();
    let objectId = props.dragURL.current + "_" + Date.now().toString();
    props.stageRef.current.setPointersPositions(e);
    props.setImagesOnLayer(
      props.imagesOnLayer.concat([
        {
          ...props.stageRef.current.getPointerPosition(),
          src: props.dragURL.current,
          id: objectId,
        },
      ])
    );
  };

  return (
    <div>
      <div
        ref={props.divRef}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleOnDrop}
        className="konva-frame"
      >
        <Stage
          className="konva-container"
          ref={props.stageRef}
          width={props.dimensions.width}
          height={props.dimensions.height}
        >
          <Layer>
            {props.imagesOnLayer.length === 0 ? (
              <KonvaText dimensions={props.dimensions} />
            ) : (
              props.imagesOnLayer.map((image, index) => {
                return (
                  <KonvaImage
                    key={index}
                    image={image}
                    setImagesOnLayer={props.setImagesOnLayer}
                  />
                );
              })
            )}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
