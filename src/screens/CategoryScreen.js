/* Components */
import PageHeading from "../components/Headings/PageHeading";
import "./CategoryScreen.css";
/* Styles */
import "./../index.css";
/* Functions */
import { randomizeBackground } from "../functions/background";
import { setBackgroundColor } from "../functions/background";
import CategoryGrid from "../components/CategoryGrid/CategoryGrid";

export default function CategoryScreen(props) {
  const color = randomizeBackground();
  setBackgroundColor(color);
  props.setBgColor(color);

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
