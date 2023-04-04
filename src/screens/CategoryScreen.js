/* Components */
import PageHeading from "../components/Headings/PageHeading";
import FrontPageGrid from "../components/FrontPageGrid/FrontPageGrid";
import "./CategoryScreen.css";
/* Styles */
import "./../index.css";
/* Functions */
import { setBackgroundColor } from "../functions/background";

export default function CategoryScreen(props) {
  const blue = getComputedStyle(document.documentElement).getPropertyValue(
    "--SMK-blue"
  );
  setBackgroundColor(blue);

  return (
    <div className="categoryScreen" style={{ backgroundColor: blue }}>
      <PageHeading
        title="All categories"
        subtitle="Choose one to begin your exploration"
        color={`var(--primary-white)`}
      />
      {props.categories ? <FrontPageGrid data={props.categories} /> : <></>}
    </div>
  );
}
