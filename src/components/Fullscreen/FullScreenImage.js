import { useEffect, useRef, useState } from "react";
import ImageMapper from "react-img-mapper";

export default function FullScreenImage(props) {
  const myRef = useRef(null);

  const [coords, setCoords] = useState([]);

  ("hej hej test");

  useEffect(() => {
    console.log("fullscreenImage", props.objects);
    const cc = props.objects.map((obj) => {
      return { coords: obj.attributes.coords, shape: "poly" };
    });
    setCoords(cc);
  }, []);

  const URL = props.imgURL;
  const MAP = {
    name: "my-map",
    areas: coords,
  };

  const handleClear = () => {
    myRef.current.clearHighlightedArea();
  };

  const clicked = (area, i, e) => {
    console.log(area, i, e);
  };

  return coords ? (
    <>
      <ImageMapper
        containerRef={myRef}
        src={URL}
        map={MAP}
        stayMultiHighlighted
        width={500}
        imgWidth={props.imgWidth}
        onClick={clicked}
      />
      <button onClick={handleClear}>Clear</button>
    </>
  ) : (
    "Loading"
  );
}
