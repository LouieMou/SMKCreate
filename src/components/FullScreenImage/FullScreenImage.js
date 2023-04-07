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
        key: obj.id,
        object_id: obj.id,
        coords: obj.attributes.coords,
        shape: "poly",
        category_id: obj.attributes.category_id,
        name: obj.attributes.category_pointer.attributes.category_name,
        label_text: obj.attributes.label_text,
        fillColor: "hsla(240, 3%, 6%, 0.66)",
        object_url: obj.attributes.object_url,
      };
    });
    setCoords(cc);
    console.log("cc", cc);
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
    setMessage(`You clicked on ${area.label_text}`);
    let obj = area;
    /* navigate("/search", { state: { obj } }); */
  };

  const getCenterPosition = (area) => {
    return {
      top: `${area.center[1]}px`,
      left: `${area.center[0]}px`,
    };
  };

  const getHeartPosition = (area) => {
    return {
      top: `${area.scaledCoords[1] + 10}px`,
      left: `${area.scaledCoords[2] - 38}px`,
    };
  };

  function handleSaveToFavorite(area) {
    setMessage(`You clicked on heart: ${area}`);
    if (fillHeart) {
      setFillHeart(false);
    } else {
      setFillHeart(true);
      /* updateFavoriteList(area); */
    }
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
            {hoverArea && (
              <p onClick={(hoverArea) => handleSaveToFavorite(hoverArea)}>
                {hoverArea.label_text}
              </p>
            )}
          </div>

          <div
            className="favorite-icon-fullscreen"
            style={{ ...getHeartPosition(hoverArea) }}
          >
            {fillHeart ? (
              <img
                src="/icons/heart_filled_white.svg"
                onClick={(hoverArea) => handleSaveToFavorite(hoverArea)}
                /* style={{ pointerEvents: "auto" }} */
              ></img>
            ) : (
              <img
                src="/icons/heart_unfilled_white.svg"
                onClick={(hoverArea) => handleSaveToFavorite(hoverArea)}
                /* style={{ pointerEvents: "auto" }} */
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
