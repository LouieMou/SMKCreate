import { React, useState, useEffect, useContext } from "react";
/* Components */
import FilterFrame from "../FilterFrame/FilterFrame";
import ImageGrid from "../ImageGrid/ImageGrid";
/* Functions */
import { readObjectsByCategory } from "../../database/Object";
/* Context */
import { SearchContext } from "../../context/SearchContext";
/* Styles */
import "./SearchComponent.css";

function SearchComponent(props) {
  const { search } = useContext(SearchContext);
  const [filter, setFilter] = useState();
  const [objects, setObjects] = useState();
  const [filteredObjects, setFilteredObjects] = useState();
  const [useFilter, setUseFilter] = useState(false);

  useEffect(() => {
    if (search) {
      fecthObjects(search);
      if (search.filter_label) {
        filterObjects(search.filter_label);
      }
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
      setObjects(objects);
    } catch (error) {}
  }

  function filterObjects(searchFilter) {
    setUseFilter(true);
    let objectsFiltered = objects.filter(
      (object) => object.attributes.label_text === searchFilter.toLowerCase()
    );
    setFilteredObjects(objectsFiltered);
    console.log("this is the searchFilter", searchFilter);
    console.log("these are the filtered objects",filteredObjects)
  }
  return (
    <div>
      <div className="search-component-container">
        <div className="sticky-container">
          {search ? (
            <FilterFrame
              category={search.category_name}
              setFilter={setFilter}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="image-grid-container-padding">
          {objects && !useFilter ? <ImageGrid data={objects} /> : <></>}
          {filteredObjects && useFilter ? (
            <ImageGrid data={filteredObjects} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
