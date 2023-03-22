import React from "react";
/* Component */
import Frame from "../components/FrontPageFrame/Frame";
import FrontPageHeading from "../components/Headings/FrontPageHeading";
import FrontPageGrid from "../components/FrontPageGrid/FrontPageGrid";
/* Functions */
import { setBackgroundColor } from "../functions/background";
/* Styles */
import "./HomeScreen.css";

import data from "../data/data.json";

function HomeScreen(props) {
  /*const textColor = data[1].suggested_bg_color;*/
  const white = getComputedStyle(document.documentElement).getPropertyValue(
    "--primary-white"
  );
  setBackgroundColor(white);
  return (
    <div className="frontpage-container">
      <Frame>
        <FrontPageHeading /*color={textColor}*/ />
        <FrontPageGrid data={data} />
      </Frame>
    </div>
  );
}

export default HomeScreen;
