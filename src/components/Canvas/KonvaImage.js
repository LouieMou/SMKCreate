import useImage from "use-image";
import React, { useState, useRef, useEffect } from "react";
import { Image, Transformer, Group, Text, Rect } from "react-konva";

export default function KonvaImage({
  image,
  setImagesOnLayer,
  setMetaDataOnLayer,
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

  const handleTransform = (e) => {
    console.log("inside Transform e:", e);
    console.log("Transformerref", transformerRef);

    const id = e.target.parent.id();
    let newWidth = transformerRef.current.width();
    let newHeight = transformerRef.current.height();
    console.log("newWidth", newWidth);
    console.log("newHeight", newHeight);

    setImagesOnLayer((imageOnLayer) =>
      imageOnLayer.map((image) => {
        if (image.id === id) {
          return { ...image, width: newWidth, height: newHeight };
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
    console.log("handleDelete clicked: e", e);

    const id = e.target.parent.id();
    console.log("handleDelete clickded: id: ", id);

    setImagesOnLayer((imageOnLayer) =>
      imageOnLayer.filter((image) => image.id !== id)
    );

    setMetaDataOnLayer((metaDataOnLayer) =>
      metaDataOnLayer.filter((image) => image.id !== id)
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
            x={image.x + (img ? image.width : 0) - 10}
            y={image.y - (img ? image.height : 0) - 10}
            width={20}
            height={20}
            fill="black"
          />
          <Text
            x={image.x + (img ? image.width : 0) - 5}
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
        onTransformEnd={handleTransform}
      />
    </>
  );
}
