import { React } from "react";
import { useNavigate, generatePath } from "react-router-dom";
/* Component */
import Frame from "../components/FrontPageFrame/Frame";
import PageHeading from "../components/Headings/PageHeading";
import ImageSlider from "../components/Slider/ImageSlider";
import LabelButton from "../components/LabelButton/LabelButton";
/* Functions */
import { setBackgroundColor } from "../functions/background";
/* Styles */
import "./HomeScreen.css";

function HomeScreen(props) {
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
    console.log("slider clicked");

    if (link === "food") {
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
      src: "/slider/1.png",
      alt: "Link to Canvas-page",
      link: "/canvas",
    },
    {
      src: "/slider/2.png",
      alt: "Link to Categories",
      link: "/categories",
    },
    {
      src: "/slider/3.png",
      alt: "Link to Food-page",
      link: "food",
    },
  ];

  return (
    <Frame>
      <div className="homescreen">
        <div className="left-heading-container">
          <PageHeading
            title="What would you like to explore?"
            subtitle="Choose a category" /*color={textColor}*/
          />
          <div className="homepage-button-container">
            <LabelButton
              button_size={"large"}
              label_text={"All Categories"}
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
