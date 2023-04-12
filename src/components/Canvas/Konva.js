import "./Konva.css";
import { Stage, Layer, Text, Image } from "react-konva";
import { useRef, useState } from "react";
import useImage from "use-image";
export default function Konva(props) {
  const stageRef = useRef(null);
  const [imagesOnLayer, setImagesOnLayer] = useState([]);

  const URLImage = ({ image }) => {
    const [img] = useImage(image.src);
    return (
      <Image
        image={img}
        x={image.x}
        y={image.y}
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
      />
    );
  };
  return (
    <div>
      <div
        onDrop={(e) => {
          e.preventDefault();
          stageRef.current.setPointersPositions(e);
          setImagesOnLayer(
            imagesOnLayer.concat([
              {
                ...stageRef.current.getPointerPosition(),
                src: props.dragURL.current,
              },
            ])
          );
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <Stage
          className="konva-container"
          ref={stageRef}
          width={window.innerWidth}
          height={window.innerHeight}
        >
          <Layer>
            {imagesOnLayer.map((image, index) => {
              return <URLImage key={index} image={image} />;
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
