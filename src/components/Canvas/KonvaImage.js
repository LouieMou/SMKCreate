import useImage from "use-image";
import React, { useState, useRef } from "react";
import { Image, Transformer, Group, Text, Rect } from "react-konva";

export default function KonvaImage({ image, setImagesOnLayer }) {
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

  const handleTransform = (e) => {
    const id = e.target.parent.id();
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
    console.log("handleDelete clickded");

    const id = e.target.parent.id();
    console.log("handleDelete clickded: id: ", id);

    setImagesOnLayer((imageOnLayer) =>
      imageOnLayer.filter((image) => image.id !== id)
    );
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
            x={image.x + (img ? img.width / 2 : 0) - 25}
            y={image.y - (img ? img.height / 2 : 0) + 5}
            width={20}
            height={20}
            fill="black"
          />
          <Text
            x={image.x + (img ? img.width / 2 : 0) - 19}
            y={image.y - (img ? img.height / 2 : 0) + 10}
            text="X"
            fill="white"
          />
        </Group>
      )}
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
