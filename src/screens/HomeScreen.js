import { useContext } from "react";
import { useNavigate, generatePath } from "react-router-dom";
/* Component */
import Frame from "../components/FrontPageFrame/Frame";
import FrontPageHeading from "../components/Headings/FrontPageHeading";
import ImageSlider from "../components/Slider/ImageSlider";
import LabelButton from "../components/LabelButton/LabelButton";
/* Functions */
import { setBackgroundColor } from "../functions/background";
/* Context */
import { SearchContext } from "../context/SearchContext";
/* Styles */
import "./HomeScreen.css";

function HomeScreen(props) {
  const { setCategoryIdAndFilter } = useContext(SearchContext);
  const navigate = useNavigate();

  const white = getComputedStyle(document.documentElement).getPropertyValue(
    "--primary-white"
  );
  setBackgroundColor(white);
  props.setBgColor(white);

  function handleNavigation() {
    navigate("/categories");
  }

  const handleSliderClick = (link) => {
    if (link === "food") {
      setCategoryIdAndFilter({ id: "D5UWgmXGQk", name: "Food" }, undefined);
      const path = generatePath("/search/:id", {
        id: "food",
      });
      navigate(path);
    } else {
      navigate(link);
    }
  };

  const content = [
    {
      src: "slider/1.png",
      alt: "Link to Category-page",
      link: "/categories",
    },
    {
      src: "slider/2.png",
      alt: "Link to Food-page",
      link: "food",
    },
    {
      src: "slider/3.png",
      alt: "Link to Canvas-page",
      link: "/canvas",
    },
  ];

  return (
    <Frame>
      <div className="homescreen">
        <div className="left-heading-container">
          <div className="pageheading-container-homescreen">
            <FrontPageHeading
              title="Which motifs inspire you?"
              subtitle="Create your own art by combining famous paintings through AI" /*color={textColor}*/
            />
          </div>
          <div className="homepage-button-container">
            <LabelButton
              button_size={"large"}
              label_text={"Start Exploring"}
              handleClick={handleNavigation}
            />
          </div>
        </div>
        <ImageSlider handleSliderClick={handleSliderClick} content={content} />
      </div>
    </Frame>
  );
}

export default HomeScreen;
