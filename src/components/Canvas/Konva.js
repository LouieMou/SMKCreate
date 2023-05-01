import "./Konva.css";
import { Stage, Layer } from "react-konva";
import { useRef, useState, useEffect } from "react";
import KonvaImage from "./KonvaImage";
import KonvaText from "./KonvaText";

export default function Konva(props) {
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
        ref={divRef}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleOnDrop}
        className="konva-frame"
      >
        <Stage
          className="konva-container"
          ref={props.stageRef}
          width={dimensions.width}
          height={dimensions.height}
        >
          <Layer>
            {props.imagesOnLayer.length === 0 ? (
              <KonvaText dimensions={dimensions} />
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
