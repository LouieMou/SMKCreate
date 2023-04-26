import { useState, useRef, useEffect } from "react";
import "./Konva.css";
import { Stage, Layer, Text, Image } from "react-konva";
import useImage from "use-image";

export default function Konva(props) {
  const [imagesOnLayer, setImagesOnLayer] = useState([]);

  const divRef = useRef();
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
      setDimensions({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      });
    }
  }, []);

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
        ref={divRef}
        onDrop={(e) => {
          e.preventDefault();
          props.stageRef.current.setPointersPositions(e);
          setImagesOnLayer(
            imagesOnLayer.concat([
              {
                ...props.stageRef.current.getPointerPosition(),
                src: props.dragURL.current,
              },
            ])
          );
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <Stage
          className="konva-container"
          ref={props.stageRef}
          width={dimensions.width}
          height={dimensions.height}
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
