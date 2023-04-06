import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
/* Component */
import ImageMapper from "react-img-mapper";
/* Styles */
import "./FullScreenImage.css";
/* Context */
import { FavoriteContext } from "../../context/FavoriteContext";

export default function FullScreenImage(props) {
  const navigate = useNavigate();

  const [coords, setCoords] = useState([]);
  const [message, setMessage] = useState("");
  const [hoverArea, setHoverArea] = useState(null);
  const [fillHeart, setFillHeart] = useState(false);

  const { updateFavoriteList } = useContext(FavoriteContext);

  useEffect(() => {
    updateAreaObject();
  }, [props.objects]);

  const URL = props.imgURL;
  const MAP = {
    name: "my-map",
    areas: coords,
  };

  function updateAreaObject() {
    const cc = props.objects.map((obj) => {
      return {
        coords: obj.attributes.coords,
        shape: "poly",
        id: obj.attributes.category_id,
        name: obj.attributes.category_pointer.attributes.category_name,
        label_text: obj.attributes.label_text,
        fillColor: "hsla(240, 3%, 6%, 0.66)",
      };
    });
    setCoords(cc);
  }

  const load = () => {
    setMessage("Interact with image !");
  };

  const enterArea = (area) => {
    setHoverArea(area);
    setMessage(`You entered ${area.shape} ${area.label_text} !`);
  };

  const leaveArea = (area) => {
    setHoverArea(null);
    setMessage("");
  };

  const clickOnObjectOnPainting = (area) => {
    setMessage(`You clicked on ${area.shape} ${area.name}`);
    let obj = area;
    /* navigate("/search", { state: { obj } }); */
  };

  const getCenterPosition = (area) => {
    console.log("area", area);
    return {
      top: `${area.center[1]}px`,
      left: `${area.center[0]}px`,
    };
  };

  const getHeartPosition = (area) => {
    console.log("area", area);
    return {
      top: `${area.scaledCoords[1] + 10}px`,
      left: `${area.scaledCoords[2] - 38}px`,
    };
  };

  function handleSaveToFavorite(imgSource) {
    updateFavoriteList(imgSource);
    setFillHeart(true);
  }

  return coords ? (
    <div className="image">
      <ImageMapper
        src={URL}
        map={MAP}
        width={500}
        imgWidth={props.imgWidth > 1660 ? 1024 : props.imgWidth}
        onLoad={() => load()}
        onClick={(area) => clickOnObjectOnPainting(area)}
        onMouseEnter={(area) => enterArea(area)}
        onMouseLeave={(area) => leaveArea(area)}
        fillColor="transparent"
        strokeColor="transparent"
      />

      {hoverArea && (
        <>
          <div
            className="object-hover"
            style={{ ...getCenterPosition(hoverArea) }}
          >
            {hoverArea && <p>{hoverArea.label_text}</p>}
          </div>

          <div
            className="favorite-icon-fullscreen"
            style={{ ...getHeartPosition(hoverArea) }}
          >
            {fillHeart ? (
              <img
                src="/icons/heart_filled_white.svg"
                onClick={() => handleSaveToFavorite(props.source)}
              ></img>
            ) : (
              <img
                src="/icons/heart_unfilled_white.svg"
                onClick={() => handleSaveToFavorite(props.source)}
              ></img>
            )}
          </div>
        </>
      )}

      <p className="message">{message ? message : ""}</p>
    </div>
  ) : (
    "Loading"
  );
}
