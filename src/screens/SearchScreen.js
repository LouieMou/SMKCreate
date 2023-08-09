import { React, useState, useEffect, useContext } from "react";
/* Components */
import FilterFrame from "../components/FilterFrame/FilterFrame";
import ImageGrid from "../components/ImageGrid/ImageGrid";
/* Functions */
import { randomizeBackground } from "../functions/background";
import { setBackgroundColor } from "../functions/background";

import { readObjectsByCategory } from "../database/Object";
/* Styles */
import "./SearchScreen.css";
/* Context */
import { SearchContext } from "../context/SearchContext";

function SearchScreen(props) {
  const { search } = useContext(SearchContext);
  const [filter, setFilter] = useState();
  const [objects, setObjects] = useState();
  const [filteredObjects, setFilteredObjects] = useState();
  const [useFilter, setUseFilter] = useState(false);

  useEffect(() => {
    if (search) {
      fecthObjects(search);
    }
  }, []);

  useEffect(() => {
    if (filter) {
      filterObjects(filter);
    }
  }, [filter]);

  async function fecthObjects(searchObject) {
    updateSearchScreenColor();
    try {
      let objects = await readObjectsByCategory(searchObject.category_id);
      if (searchObject.filter_label) {
        setObjects(objects);
        setFilter(searchObject.filter_label);
      } else {
        setObjects(objects);
      }
    } catch (error) {}
  }

  function filterObjects(searchFilter) {
    setUseFilter(true);
    let objectsFiltered = objects.filter(
      (object) => object.label_text === searchFilter
    );
    setFilteredObjects(objectsFiltered);
    updateSearchScreenColor();
  }

  function showAllObjectsInCategory() {
    console.log("Remove search filter");
    updateSearchScreenColor();
    setUseFilter(false);
  }

  function updateSearchScreenColor() {
    const color = randomizeBackground();
    props.setBgColor(color);
    setBackgroundColor(color);
  }

  return (
    <div className="search-screen">
      <div
        className="search-screen-left"
        style={{ backgroundColor: props.bgColor }}
      >
        {search ? (
          <FilterFrame
            category={search.category_name}
            setFilter={setFilter}
            showAllObjectsInCategory={showAllObjectsInCategory}
            label_text_color={props.bgColor}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="search-screen-right">
        <p style={{textAlign: 'center', color: 'white'}}>Save the objects you like, by clicking on the heart. See the full sized painting by clicking on the artist name </p>
        {objects && !useFilter ? <ImageGrid list={objects} /> : <></>}
        {filteredObjects && useFilter ? (
          <ImageGrid list={filteredObjects} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default SearchScreen;
