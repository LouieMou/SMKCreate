import { useEffect, useState, useContext } from "react";
/* Component */
import ImageMapper from "react-img-mapper";
/* Styles */
import "./FullScreenImage.css";
/* Context */
import { FavoriteContext } from "../../context/FavoriteContext";

export default function FullScreenImage(props) {
  const [coords, setCoords] = useState([]);
  const [message, setMessage] = useState("");
  const [savedObject, setSavedObject] = useState();
  const [scaledWidth, setScaledWidth] = useState();

  // context
  const { updateFavoriteList } = useContext(FavoriteContext);

  useEffect(() => {
    updateAreaObject();
    updateScale();
  }, []);

  useEffect(() => {
    if (savedObject) {
      saveToFavoriteList(savedObject);
    }
  }, [savedObject]);

  const URL = props.imgURL;
  const MAP = {
    name: "my-map",
    areas: coords,
  };

  function updateAreaObject() {
    const cc = props.objects.map((obj) => {
      return {
        key: obj.id,
        coords: obj.attributes.coords,
        shape: "poly",
        category_id: obj.attributes.category_id,
        name: obj.attributes.category_pointer.attributes.category_name,
        label_text: obj.attributes.label_text,
        fillColor: "hsla(240, 3%, 6%, 0.66)",
        object_url: obj.attributes.object_url,
        fillHeart: false,
        painting_id: props.painting_id,
        artist: obj.attributes.painting_pointer.attributes.artist,
        title: obj.attributes.painting_pointer.attributes.title,
      };
    });
    setCoords(cc);
  }

  const load = () => {
    setMessage("Hover the image to explore the objects!");
  };

  const enterArea = (area) => {
    props.setHoverArea(area);
    console.log("this is the area:", area);
    setMessage(`${area.label_text}`);
  };

  function startsWithVowel(word) {
    const vowels = "aeiou";
    if (vowels.indexOf(word[0]) !== -1) {
      return "an";
    } else {
      return "a";
    }
  }

  const leaveArea = (area) => {
    props.setHoverArea(null);
    setMessage("Hover the image to explore the objects");
  };

  const getCenterPosition = (area) => {
    return {
      top: `${area.center[1] - 14}px`,
      left: `${area.center[0] - 12.5}px`,
    };
  };

  function saveToFavoriteList(savedObject) {
    let object = {
      id: savedObject.key,
      label_text: savedObject.label_text,
      object_url: savedObject.object_url,
      painting_id: savedObject.painting_id,
      artist: savedObject.artist,
      title: savedObject.title,
    };
    if (props.hoverArea) {
      props.hoverArea.fillHeart = true;
    }
    setMessage(
      `You saved ${startsWithVowel(savedObject.label_text)} ${
        savedObject.label_text
      } to your favorite list`
    );
    updateFavoriteList(object);
  }

  function updateScale() {
    const heightImage = props.imgHeight;
    const maxImageHeight = window.innerHeight - 125 - 70;
    const procentSmaller = (maxImageHeight / heightImage) * 100;
    const scaledWidthImage = (procentSmaller * props.imgWidth) / 100;
    setScaledWidth(scaledWidthImage);
    function getImgWidth() {
      if (props.imgWidth > 1660) {
        return 1024;
      } else {
        return props.imgWidth;
      }
    }

    props.setScale(getImgWidth() / scaledWidthImage);
  }

  return coords ? (
    <div className="image-fullscreen-container">
      <ImageMapper
        src={URL}
        map={MAP}
        width={scaledWidth}
        imgWidth={props.imgWidth > 1660 ? 1024 : props.imgWidth}
        onClick={(area) => setSavedObject(area)}
        onLoad={() => load()}
        onMouseEnter={(area) => enterArea(area)}
        onMouseLeave={(area) => leaveArea(area)}
        fillColor="transparent"
        strokeColor="transparent"
      />

      {props.hoverArea && (
        <>
          <div
            className="favorite-icon-fullscreen"
            style={{ ...getCenterPosition(props.hoverArea) }}
          >
            {props.hoverArea.fillHeart ? (
              <img src="/icons/heart_filled_white.svg" alt="icon"></img>
            ) : (
              <img src="/icons/heart_unfilled_white.svg" alt="icon"></img>
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
