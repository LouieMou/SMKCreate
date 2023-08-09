import { useContext, useEffect } from "react";
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

  useEffect(() => {
    const white = getComputedStyle(document.documentElement).getPropertyValue(
      "--primary-white"
    );
    setBackgroundColor(white);
    props.setBgColor(white);
  }, []);

  function handleNavigation() {
    navigate("/categories");
  }

  const handleSliderClick = (link) => {
    const filter = link;
    switch (link) {
      case "skull":
        setCategoryIdAndFilter({ id: "fuksgbj7UM", name: "Occultism" }, link);
        const path_skull = generatePath("/search/:id", {
          id: "occultism",
        });
        navigate(path_skull, { state: { filter } });
        break;

      case "lobster":
        setCategoryIdAndFilter({ id: "D5UWgmXGQk", name: "Food" }, link);
        const path_lobster = generatePath("/search/:id", { id: "food" });
        navigate(path_lobster, { state: { filter } });
        break;

      case "face":
        setCategoryIdAndFilter({ id: "6mghHNbCJk", name: "Human" }, link);
        const path_face = generatePath("/search/:id", { id: "human" });
        navigate(path_face, { state: { filter } });
        break;

      case "lamp":
        setCategoryIdAndFilter({ id: "5x8Q5HCweq", name: "Interior" }, link);
        const path_lamp = generatePath("/search/:id", { id: "interior" });
        navigate(path_lamp, { state: { filter } });
        break;

      default:
        navigate("/categories");
    }
  };

  const content = [
    {
      src: "/slider/1.png",
      alt: "Link to search-page-occultism",
      link: "skull",
    },
    {
      src: "/slider/2.png",
      alt: "Link to search-page-food",
      link: "lobster",
    },
    {
      src: "/slider/3.png",
      alt: "Link to search-page-human",
      link: "face",
    },
    {
      src: "/slider/4.png",
      alt: "Link to search-page-interior",
      link: "lamp",
    },
  ];

  return (
    <Frame>
      <div className="homescreen">
        <div className="left-heading-container">
          <div className="pageheading-container-homescreen">
            <FrontPageHeading
              title={`How many skulls, lobsters, faces and lamps can you find?`}
              subtitle="Discover the many peculiar objects that appear in SMK's digital collection of paintings"
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
        <ImageSlider
          handleSliderClick={handleSliderClick}
          content={content}
        />
      </div>
    </Frame>
  );
}

export default HomeScreen;
