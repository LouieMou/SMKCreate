import "./Konva.css";
import { Stage, Layer, Text, Image } from "react-konva";
import { useRef, useState, useEffect } from "react";
import useImage from "use-image";
export default function Konva(props) {
  const stageRef = useRef();
  const [imagesOnLayer, setImagesOnLayer] = useState([]);

  const divRef = useRef();
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const handleDragEnd = (e) => {
    const id = e.target.id;
    const newX = e.target.x();
    const newY = e.target.y();

    setImagesOnLayer((imagesOnLayer) =>
      imagesOnLayer.map((image) => {
        if (image.id === id) {
          return { ...image, x: newX, y: newY };
        } else {
          return image;
        }
      })
    );
  };

  useEffect(() => {
    console.log(
      "This is the id: ",
      imagesOnLayer[imagesOnLayer.length - 1]?.id
    );
  }, [imagesOnLayer]);

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
        draggable
        onDragEnd={handleDragEnd}
      />
    );
  };
  return (
    <div>
      <div
        ref={divRef}
        onDrop={(e) => {
          e.preventDefault();
          stageRef.current.setPointersPositions(e);
          setImagesOnLayer(
            imagesOnLayer.concat([
              {
                ...stageRef.current.getPointerPosition(),
                src: props.dragURL.current,
                id:
                  props.dragURL.current.toString() +
                  "_" +
                  Date.now().toString(),
              },
            ])
          );
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <Stage
          className="konva-container"
          ref={stageRef}
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
