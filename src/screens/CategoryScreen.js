import { useEffect } from "react";
/* Components */
import PageHeading from "../components/Headings/PageHeading";
import CategoryGrid from "../components/CategoryGrid/CategoryGrid";
import "./CategoryScreen.css";
/* Styles */
import "./../index.css";
/* Functions */
import { randomizeBackground } from "../functions/background";
import { setBackgroundColor } from "../functions/background";

export default function CategoryScreen(props) {
  useEffect(() => {
    const color = randomizeBackground();
    setBackgroundColor(color);
    props.setBgColor(color);
  }, []);

  return (
    <div className="categoryScreen">
      <PageHeading
        title="All categories"
        subtitle="Choose one to begin your exploration"
        color={`var(--primary-white)`}
      />
      {props.categories ? <CategoryGrid data={props.categories} /> : <></>}
    </div>
  );
}
