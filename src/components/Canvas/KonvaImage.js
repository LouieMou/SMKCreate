import useImage from "use-image";
import { Image, Transformer } from "react-konva";
import { useState, useCallback } from "react";

export default function KonvaImage({ image, setImagesOnLayer }) {
  const [img] = useImage(image.src);
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = useCallback(() => {
    console.log("handleSelect from clcik");
    setIsSelected(true);
  }, []);

  const handleDeselect = useCallback(() => {
    setIsSelected(false);
  }, []);

  const handleTransform = useCallback(
    (e) => {
      const node = e.target;
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();

      // update the image position to align with the transformer's position
      const dx = node.width() * scaleX * 0.5;
      const dy = node.height() * scaleY * 0.5;
      const x = node.x() - dx;
      const y = node.y() - dy;

      setImagesOnLayer((imageOnLayer) =>
        imageOnLayer.map((image) => {
          if (image.id === node.id()) {
            return { ...image, x, y, scaleX, scaleY };
          } else {
            return image;
          }
        })
      );
    },
    [setImagesOnLayer]
  );

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
  const imgId = image.id;
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
        onTap={handleSelect}
        onMouseUp={handleSelect}
        onTouchEnd={handleSelect}
        onTransformEnd={handleTransform}
      />
      {isSelected && (
        <Transformer
          anchorSize={10}
          borderDash={[6, 2]}
          borderEnabled
          rotationEnabled={false}
          keepRatio={false}
          ref={(node) => {
            // manually attach transformer node to image node
            const imgNode = node.getParent().findOne(`#${imgId}`);
            if (imgNode) {
              node.nodes([imgNode]);
            }
          }}
        />
      )}
    </>
  );
}
