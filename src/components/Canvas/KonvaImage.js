import useImage from "use-image";
import React, { useState, useRef, useEffect } from "react";
import { Image, Transformer, Group, Text, Rect } from "react-konva";

export default function KonvaImage({
  image,
  setImagesOnLayer,
  setMetaDataOnLayer,
  generatedImage,
  clearCanvas,
}) {
  const [img] = useImage(image.src);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const imgId = image.id;
  const transformerRef = useRef(null);

  const handleDragEnd = (e) => {
    const id = e.target.id();
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

    setShowDeleteButton(!isSelected);
  };

  const handleDelete = (e) => {
    const id = e.target.parent.id();
    setImagesOnLayer((imageOnLayer) =>
      imageOnLayer.filter((image) => image.id !== id)
    );

    setMetaDataOnLayer((metaDataOnLayer) =>
      metaDataOnLayer.filter((image) => image.id !== id)
    );

    if (generatedImage) {
      clearCanvas();
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
      {showDeleteButton && (
        <Group id={imgId} onClick={handleDelete}>
          <Rect
            x={image.x + (img ? image.width : 0) - 10}
            y={image.y - (img ? image.height : 0) - 10}
            width={20}
            height={20}
            fill="black"
          />
          <Text
            x={image.x + (img ? image.width : 0) - 4}
            y={image.y - (img ? image.height : 0) - 5}
            text="X"
            fill="white"
          />
        </Group>
      )}
      <Transformer
        anchorSize={5}
        borderDash={[2, 2]}
        borderEnabled
        rotationEnabled={false}
        keepRatio={false}
        ref={transformerRef}
      />
    </>
  );
}
