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
    setMessage("Hover the image to explore the objects!");
  };

  const enterArea = (area) => {
    setHoverArea(area);
    let an = "an";
    let a = "a"
    setMessage(`You found ${startsWithVowel(area.label_text) ? an: a} ${area.label_text} !`);
  };

  function startsWithVowel(word){
   const vowels = ("aeiou"); 
   return vowels.indexOf(word[0]) !== -1;
}

  const leaveArea = (area) => {
    setHoverArea(null);
    setMessage("Hover the image to explore the objects!");
  };

  const clickOnObjectOnPainting = (area) => {
    setMessage(`You clicked on ${area.label_text}`);
    let obj = area;
    /* navigate("/search", { state: { obj } }); */
  };

  const getCenterPosition = (area) => {
    return {
      top: `${area.center[1] - 14}px`,
      left: `${area.center[0] - 12.5}px`,
    };
  };

 /*  const getHeartPosition = (area) => {
    return {
      top: `${area.scaledCoords[1] + 10}px`,
      left: `${area.scaledCoords[2] - 38}px`,
    };
  }; */

  function handleSaveToFavorite(area) {
    setMessage(`You clicked on heart: ${area}`);
    setFillHeart(!fillHeart)
  }

  return coords ? (
    <div className="image">
      <ImageMapper
        src={URL}
        map={MAP}
        width={500}
        imgWidth={props.imgWidth > 1660 ? 1024 : props.imgWidth}
        onLoad={() => load()}
        onClick={(area) => handleSaveToFavorite(area)}
        onMouseEnter={(area) => enterArea(area)}
        onMouseLeave={(area) => leaveArea(area)}
        fillColor="transparent"
        strokeColor="transparent"
      />

      {hoverArea && (
        <>
         {/*  <div
            className="object-hover"
            style={{ ...getCenterPosition(hoverArea) }}
          >
            {hoverArea && (
              <p onClick={(hoverArea) => handleSaveToFavorite(hoverArea)}>
                {hoverArea.label_text}
              </p>
            )}
          </div> */}

          <div
            className="favorite-icon-fullscreen"
            style={{ ...getCenterPosition(hoverArea) }}
          >
            {fillHeart ? (
              <img
                src="/icons/heart_filled_white.svg"
              ></img>
            ) : (
              <img
                src="/icons/heart_unfilled_white.svg"
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
