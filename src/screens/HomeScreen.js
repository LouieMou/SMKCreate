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
  const navigate = useNavigate();

  const white = getComputedStyle(document.documentElement).getPropertyValue(
    "--primary-white"
  );
  setBackgroundColor(white);
  props.setBgColor(white);

  function handleNavigation() {
    navigate("/categories");
  }

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
        {props.categories ? <FrontPageGrid data={props.categories} /> : <></>}
      </div>
    </Frame>
  );
}

export default HomeScreen;
