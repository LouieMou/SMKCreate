import "./Konva.css";
import { Stage, Layer, Text, Image } from "react-konva";
import { useRef, useState } from "react";
import useImage from "use-image";
export default function Konva(props) {
  const stageRef = useRef(null);
  const [imagesOnLayer, setImagesOnLayer] = useState([]);

  const handleOnCanvasDragStart = (e) => {
    console.log("here is an image e", e);
    e.evt.preventDefault();
    e.cancelBubble = true;

    setImagesOnLayer(
      imagesOnLayer.map((image) => {
        return {
          ...image,
          draggable: false,
        };
      })
    );
    //console.log("image in handle", image);
    const id = e.target.id;
    setImagesOnLayer(
      imagesOnLayer.map((image) => {
        return {
          ...image,
          draggable: image.id === id,
        };
      })
    );
  };

  const handleOnCanvasDragEnd = (e) => {
    console.log();
    e.preventDefault();
    console.log(e);
    const draggableImage = imagesOnLayer.find((image) => image.draggable);
    if (draggableImage) {
      const newImagesOnLayer = imagesOnLayer.map((image) => {
        if (image.id === draggableImage.id) {
          return {
            ...image,
            draggable: false,
            x: image.x + e.target.x(),
            y: image.y + e.target.y(),
          };
        } else {
          return image;
        }
      });
      setImagesOnLayer(newImagesOnLayer);
      console.log("newimagewsonl", newImagesOnLayer);
    }
  };

  const URLImage = ({ image }) => {
    const [img] = useImage(image.src);
    console.log("iiimage", image);
    return (
      <Image
        id={image.id}
        image={img}
        x={image.x}
        y={image.y}
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
        onDragStart={handleOnCanvasDragStart}
        onDrop={handleOnCanvasDragEnd}
        onDragOver={(e) => e.preventDefault()}
        draggable
      />
    );
  };

  return (
    <div>
      <div
        onDrop={(e) => {
          e.preventDefault();
          stageRef.current.setPointersPositions(e);
          setImagesOnLayer([
            ...imagesOnLayer,
            {
              ...stageRef.current.getPointerPosition(),
              src: props.dragURL.current.url,
              id: props.dragURL.current.id + imagesOnLayer.length,
            },
          ]);
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
