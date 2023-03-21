import { useEffect, useRef, useState } from "react";
import ImageMapper from "react-img-mapper";
import "./../../index.css";

export default function FullScreenImage(props) {
  const myRef = useRef(null);

  const [coords, setCoords] = useState([]);

  useEffect(() => {
    console.log("fullscreenImage", props.objects);
    const cc = props.objects.map((obj) => {
      return {
        coords: obj.attributes.coords,
        shape: "poly",
        label_text: obj.attributes.label_text,
      };
    });
    setCoords(cc);
  }, []);

  const URL = props.imgURL;
  const MAP = {
    name: "my-map",
    areas: coords,
  };

  const clicked = (area, i, e) => {
    console.log(`I clicked on a(n) ${area.label_text}`);
  };

  let colorHover =
    props.colorMode === "var(--primary-white)"
      ? "hsla(120, 100%, 100%, 0.66)"
      : "hsla(240, 3%, 6%, 0.66)";

  return coords ? (
    <>
      <ImageMapper
        containerRef={myRef}
        src={URL}
        map={MAP}
        width={500}
        imgWidth={props.imgWidth}
        onClick={clicked}
        fillColor={colorHover}
        strokeColor={colorHover}
      />
    </>
  ) : (
    "Loading"
  );
}
