import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
/* Component */
import ImageMapper from "react-img-mapper";
/* Context */
import { SearchContext } from "../../context/SearchContext";
/* Styles */
import "./FullScreenImage.css";

export default function FullScreenImage(props) {
  //const myRef = useRef(null);
  const navigate = useNavigate();

  const [coords, setCoords] = useState([]);
  const [hoverArea, setHoverArea] = useState(null);

  useEffect(() => {
    updateAreaObject()

  }, [props.objects]);

  const URL = props.imgURL;
  const MAP = {
    name: "my-map",
    areas: coords,
  };

  function updateAreaObject(){
    const cc = props.objects.map((obj) => {
      return {
        coords: obj.attributes.coords,
        shape: "poly",
        id: obj.attributes.category_id,
        name: obj.attributes.category_pointer.attributes.category_name,
        label_text: obj.attributes.label_text,
      };
    });
    setCoords(cc);
    console.log(coords);
  }

  const enterArea = (area) => {
    console.log("this is area", area);
    setHoverArea(area);
  };

  const clickOnObjectOnPainting = (area) => {
    console.log(`I clicked on a(n) ${area.id}`);
    console.log("This is name", area.name);
    let obj = area;
    navigate("/search", { state: { obj } });
  };

  const getCenterPosition = (area) => {
    let top = area.center[1];
    let left = area.center[0];
    return { top: `${top}px`, left: `${left}px` };
  };

  const getObjectPosition = (area) => {
    let choords = area.scaledCoords;
    console.log("hoverarea: ", choords);
    let x1 = choords[0];
    let y1 = choords[1];
    let x2 = choords[2];
    let y2 = choords[6];

    return {
      clipPath: `polygon(${x1} ${y1}, ${x2} ${y1}, ${x2} ${y2}, ${x1} ${y2});`,
    };
  };

  let colorHover =
    props.colorMode === "var(--primary-white)"
      ? "hsla(120, 100%, 100%, 0.66)"
      : "hsla(240, 3%, 6%, 0.66)"

  return coords ? (
    <div className="image">
      <ImageMapper
        //containerRef={myRef}
        src={URL}
        map={MAP}
        width={500}
        imgWidth={props.imgWidth > 1660 ? 1024 : props.imgWidth}
        onClick={(area) => clickOnObjectOnPainting(area)}
        onMouseEnter={(area) => enterArea(area)}
        fillColor="transparent"
        strokeColor="transparent"
      />

      {hoverArea && (
        <span
          onClick={() => {
            clickOnObjectOnPainting(hoverArea);
          }}
          className="hover-area"
          style={{
            ...getCenterPosition(hoverArea),
            color: { colorHover },
            ...getObjectPosition(hoverArea),
            borderColor: { colorHover },
          }}
        >
          {hoverArea && hoverArea.label_text}
        </span>
      )}
    </div>
  ) : (
    "Loading"
  );
}
