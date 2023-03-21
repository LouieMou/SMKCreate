import { React} from "react";
/* Components */
import SearchComponent from "../components/SearchComponent/SearchComponent";
/* Functions */
import { setBackgroundColor } from "../functions/background";
/* Styles */
import "./SearchScreen.css";
/* Context */
import { FilterContextProvider } from "../context/FilterContext";

function SearchScreen(props) {

  const yellow = getComputedStyle(document.documentElement).getPropertyValue(
    "--secondary-yellow"
  );
  setBackgroundColor(yellow);
  return (
    <>
      <FilterContextProvider>
        <SearchComponent/>
      </FilterContextProvider>
    </>
  );
}

export default SearchScreen;
