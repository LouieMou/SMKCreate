import { React, useContext, useEffect, useState } from "react";
/* Component */
import Frame from "../components/FrontPageFrame/Frame";
import PageHeading from "../components/Headings/PageHeading";
import FrontPageGrid from "../components/FrontPageGrid/FrontPageGrid";
import FavoriteBoard from "../components/FavoriteBoard/FavoriteBoard";
/* Functions */
import { setBackgroundColor } from "../functions/background";
/* Styles */
import "./HomeScreen.css";
import { FavoriteContext } from "../context/FavoriteContext";

function HomeScreen(props) {
  /*const textColor = data[1].suggested_bg_color;*/
  const white = getComputedStyle(document.documentElement).getPropertyValue(
    "--primary-white"
  );

  setBackgroundColor(white);
  return (
    <div className="frontpage-container">
      <Frame>
        <PageHeading
          title="What would you like to explore?"
          subtitle="Choose a category" /*color={textColor}*/
        />
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
