import "./Konva.css";
import { Stage, Layer, Text, Image } from "react-konva";
import { useRef, useState } from "react";
import useImage from "use-image";
export default function Konva(props) {
  const stageRef = useRef(null);
  const [imagesOnLayer, setImagesOnLayer] = useState([]);

  const handleOnCanvasDragStart = (image) => {
    console.log("x dragstart: ", image.x);
    console.log("y dragstart: ", image.y);
    const id = image.id;
    setImagesOnLayer(
      imagesOnLayer.map((image) => {
        return {
          ...image,
          isDragging: image.id === id,
        };
      })
    );

    console.log("here is imagesOnLayer in DragStart:", imagesOnLayer);
  };

  const handleOnCanvasDragMove = (e, image) => {
    const id = image.id;
    console.log("x dragmove: ", image.x);
    console.log("y dragmove: ", image.y);
    setImagesOnLayer((prevImages) => {
      return prevImages.map((image) => {
        if (image.id === id) {
          return {
            ...image,
            x: image.x + e.evt.layerX,
            y: image.y + e.evt.layerY,
          };
        } else {
          return image;
        }
      });
    });
  };

  const handleOnCanvasDragEnd = (image) => {
    console.log("DragEnd image: ", image);
    console.log("x DragEnd: ", image.x);
    console.log("y DragEnd: ", image.y);
    const draggableImage = imagesOnLayer.find((image) => image.isDragging);
    if (draggableImage) {
      const newImagesOnLayer = imagesOnLayer.map((image) => {
        if (image.id === draggableImage.id) {
          return {
            ...image,
            isDragging: false,
            x: image.x,
            y: image.y,
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
    /*     console.log("URLImage id", image.id); */
    console.log("start x", image.x);
    console.log("start y", image.y);
    return (
      <Image
        id={image.id}
        image={img}
        x={image.x}
        y={image.y}
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
        onDragStart={() => handleOnCanvasDragStart(image)}
        onDragMove={(e) => handleOnCanvasDragMove(e, image)}
        onDragEnd={() => handleOnCanvasDragEnd(image)}
        isDragging={false}
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
              id: props.dragURL.current.id + "_" + Date.now(),
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
