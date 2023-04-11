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

  
  useEffect(() => {
    props.setBackgroundColor(randomizeBackground());
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
    props.setBackgroundColor(randomizeBackground());
  }

  function showAllObjectsInCategory(){
    console.log("Remove search filter")
    props.setBackgroundColor(randomizeBackground());
    setUseFilter(false);
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
