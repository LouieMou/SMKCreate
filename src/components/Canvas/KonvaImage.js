import useImage from "use-image";
import { Image } from "react-konva";

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

  const [img] = useImage(image.src);
  let imgId = image.id;
  return (
    <Image
      image={img}
      id={imgId}
      x={image.x}
      y={image.y}
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
      draggable
      onDragEnd={handleDragEnd}
    />
  );
}
