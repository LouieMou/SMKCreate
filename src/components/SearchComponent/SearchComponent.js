import { React, useState, useEffect, useContext } from "react";
/* Components */
import FilterFrame from "../LabelComponent/FilterFrame";
import ImageGrid from "../ImageItem/ImageGrid";
/* Functions */
import { readObjectsByCategory } from "../../database/Object";
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
      let objects = await readObjectsByCategory(props.state.obj.id);
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
        <div className="sticky-container">
        <FilterFrame category={props.state.obj.name}/>
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
