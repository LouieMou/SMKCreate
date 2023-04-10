import { React } from "react";
import { useNavigate } from "react-router-dom";
/* Component */
import Frame from "../components/FrontPageFrame/Frame";
import PageHeading from "../components/Headings/PageHeading";
import FrontPageGrid from "../components/FrontPageGrid/FrontPageGrid";
import LabelButton from "../components/LabelButton/LabelButton";
/* Functions */
import { setBackgroundColor } from "../functions/background";
/* Styles */
import "./HomeScreen.css";

function HomeScreen(props) {
  /*const textColor = data[1].suggested_bg_color;*/
  const white = getComputedStyle(document.documentElement).getPropertyValue(
    "--primary-white"
  );

  setBackgroundColor(white);

  const navigate = useNavigate();

  function handleNavigation() {
    navigate("/categories");
  }

  return (
    <div className="homepage-container">
      <Frame>
        <div className="heading-button-container">
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
        {props.categories ? (
          <FrontPageGrid data={props.categories.slice(0, 9)} />
        ) : (
          <></>
        )}
      </Frame>
    </div>
  );
}

export default HomeScreen;
