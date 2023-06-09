import "./Konva.css";
import { Stage, Layer } from "react-konva";
import KonvaImage from "./KonvaImage";
import KonvaText from "./KonvaText";
import KonvaAnimation from "./KonvaAnimation";

export default function Konva(props) {
  const handleOnDrop = (e) => {
    e.preventDefault();

    props.stageRef.current.setPointersPositions(e);
    props.setImagesOnLayer(
      props.imagesOnLayer.concat([
        {
          ...props.stageRef.current.getPointerPosition(),
          src: props.dragURL.current,
          id: props.dragId.current,
          width: 0,
          height: 0,
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
            {props.loading ? (
              <KonvaAnimation
                dimensions={props.dimensions}
                loading={props.loading}
              />
            ) : (
              <>
                {props.imagesOnLayer.length === 0 ? (
                  <KonvaText dimensions={props.dimensions} />
                ) : (
                  props.imagesOnLayer.map((image, index) => {
                    return (
                      <KonvaImage
                        key={index}
                        image={image}
                        setImagesOnLayer={props.setImagesOnLayer}
                        setMetaDataOnLayer={props.setMetaDataOnLayer}
                        generatedImage={props.generatedImage}
                        clearCanvas={props.clearCanvas}
                      />
                    );
                  })
                )}
              </>
            )}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
