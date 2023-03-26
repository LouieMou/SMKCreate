import {React, useEffect, useState} from "react";
/* Component */
import Frame from "../components/FrontPageFrame/Frame";
import FrontPageHeading from "../components/Headings/FrontPageHeading";
import FrontPageGrid from "../components/FrontPageGrid/FrontPageGrid";
/* Functions */
import { setBackgroundColor } from "../functions/background";
import {getAllCategoriesWithImage} from "../database/Category";
/* Styles */
import "./HomeScreen.css";

import data from "../data/data.json";

function HomeScreen(props) {
  useEffect(() => {
    fectCategories().then(console.log(categories));
  }, []);

  const [categories, setCategories] = useState();
  /*const textColor = data[1].suggested_bg_color;*/
  const white = getComputedStyle(document.documentElement).getPropertyValue(
    "--primary-white"
  );

  async function fectCategories(){
    let categoryResult = await getAllCategoriesWithImage()
    setCategories(categoryResult);
  }

  setBackgroundColor(white);
  return (
    <div className="frontpage-container">
      <Frame>
        <FrontPageHeading /*color={textColor}*/ />
        {categories ? 
        <FrontPageGrid data={categories} />
         : <></>}
      </Frame>
    </div>
  );
}

export default HomeScreen;
