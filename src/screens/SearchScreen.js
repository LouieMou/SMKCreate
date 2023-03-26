import { React} from "react";
import { useLocation } from "react-router-dom";
/* Components */
import SearchComponent from "../components/SearchComponent/SearchComponent";
/* Functions */
import { setBackgroundColor } from "../functions/background";
/* Styles */
import "./SearchScreen.css";
/* Context */
import { FilterContextProvider } from "../context/FilterContext";

function SearchScreen(props) {
  const { state } = useLocation();

  const yellow = getComputedStyle(document.documentElement).getPropertyValue(
    "--secondary-yellow"
  );
  setBackgroundColor(yellow);
  return (
    <>
      <FilterContextProvider>
        <SearchComponent state={state}/>
      </FilterContextProvider>
    </>
  );
}

export default SearchScreen;
