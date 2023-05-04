import useImage from "use-image";
import useRef from "react";
import { Image, Transformer } from "react-konva";

export default function KonvaImage({ image, setImagesOnLayer }) {
  const handleDragEnd = (e) => {
    let id = e.target.id();
    const newX = e.target.x();
    const newY = e.target.y();

    setImagesOnLayer((imageOnLayer) =>
      imageOnLayer.map((image) => {
        if (image.id === id) {
          return { ...image, x: newX, y: newY };
        } else {
          return image;
        }
      })
    );
  };

  const handleTransform = (e) => {
    let id = e.target.parent.id();
    const node = e.target.parent;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    setImagesOnLayer((imageOnLayer) =>
      imageOnLayer.map((image) => {
        if (image.id === id) {
          return { ...image, scaleX: scaleX, scaleY: scaleY };
        } else {
          return image;
        }
      })
    );
  };

  const [img] = useImage(image.src);
  let imgId = image.id;
  const transformerRef = useRef(null);

  const handleSelect = (e) => {
    const clickedId = e.target.id();
    const isSelected = transformerRef.current
      .nodes()
      .some((node) => node.id() === clickedId);

    if (isSelected) {
      transformerRef.current.nodes([]);
    } else {
      transformerRef.current.nodes([e.target]);
    }
  };

  return (
    <>
      <Image
        image={img}
        id={imgId}
        x={image.x}
        y={image.y}
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
        draggable
        onDragEnd={handleDragEnd}
        onClick={handleSelect}
      />
      <Transformer
        anchorSize={10}
        borderDash={[6, 2]}
        borderEnabled
        rotationEnabled={false}
        keepRatio={false}
        ref={transformerRef}
        onTransformEnd={handleTransform}
      />
    </>
  );
}
