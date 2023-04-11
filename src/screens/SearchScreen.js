import { React, useState, useEffect, useContext } from "react";
/* Components */
import FilterFrame from "../components/FilterFrame/FilterFrame";
import ImageGrid from "../components/ImageGrid/ImageGrid";
/* Functions */
import { randomizeBackground } from "../functions/background";
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
  const [color, setColor] = useState()

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
      updateSearchScreenColor()
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
    updateSearchScreenColor()
  }

  function showAllObjectsInCategory(){
    console.log("Remove search filter")
    updateSearchScreenColor()
    setUseFilter(false);
  }

  function updateSearchScreenColor(){
    randomizeBackground()
    setColor(randomizeBackground())
  }

  return (
    <>
      <div className="search-component-container">
        <div className="sticky-container">
          {search ? (
            <FilterFrame
              category={search.category_name}
              setFilter={setFilter}
              showAllObjectsInCategory={showAllObjectsInCategory}
              label_text_color={color}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="image-grid-container-padding">
          {objects && !useFilter ? <ImageGrid list={objects} /> : <></>}
          {filteredObjects && useFilter ? (
            <ImageGrid list={filteredObjects} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchScreen;
