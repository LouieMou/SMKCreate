/* Components */
import PageHeading from "../components/Headings/PageHeading";
import FrontPageGrid from "../components/FrontPageGrid/FrontPageGrid";
import "./CategoryScreen.css";
/* Styles */
import "./../index.css";
/* Functions */
import { randomizeBackground } from "../functions/background";

export default function CategoryScreen(props) {
  randomizeBackground()

  return (
    <div className="categoryScreen">
      <PageHeading
        title="All categories"
        subtitle="Choose one to begin your exploration"
        color={`var(--primary-white)`}
      />
      {props.categories ? <FrontPageGrid data={props.categories} /> : <></>}
    </div>
  );
}
