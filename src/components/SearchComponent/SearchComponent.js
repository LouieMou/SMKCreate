import { React, useState, useEffect, useContext } from "react";
/* Components */
import FilterFrame from "../LabelComponent/FilterFrame";
import ImageGrid from "../ImageItem/ImageGrid";
import CustomScroller from "react-custom-scroller";
/* Functions */
import { readObjectsBySearchFilter } from "../../database/Fruit";
/* Context */
import { FilterContext } from "../../context/FilterContext";
/* Styles */
import "./SearchComponent.css";

function SearchComponent(props) {
  const [filter, setFilter] = useContext(FilterContext);

  useEffect(() => {
    fecthObjects().then(console.log("UseEffect has processed", objects));
  }, []);

  useEffect(() => {
    if (filter) {
      filterObjects(filter);
    }
  }, [filter]);

  const [objects, setObjects] = useState();
  const [filteredObjects, setFilteredObjects] = useState();
  const [useFilter, setUseFilter] = useState(false);
  async function fecthObjects() {
    try {
      let objects = await readObjectsBySearchFilter();
      setObjects(objects);
    } catch (error) {}
  }

  function filterObjects(searchFilter) {
    setUseFilter(true);
    let objectsFiltered = objects.filter(
      (object) => object.attributes.label_text === searchFilter
    );
    setFilteredObjects(objectsFiltered);
  }
  return (
    <div>
      <div className="search-component-container">
        <FilterFrame />
        <div className="scroll-container">
          <CustomScroller
            className="scrollbar-vertical"
            style={{ width: "1100px", height: "800px" }}
          >
            {objects && !useFilter ? <ImageGrid data={objects} /> : <></>}
            {filteredObjects && useFilter ? (
              <ImageGrid data={filteredObjects} />
            ) : (
              <></>
            )}
          </CustomScroller>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
