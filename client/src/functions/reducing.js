
export function sortByUniqueObjectLabels(objects) {
  // Sort the array by label_text and remove duplicates
  const sortedObjects = objects.reduce((accumulator, currentObject) => {
    // Find the index of the current object in the accumulator
    const index = accumulator.findIndex((obj) => obj.attributes.label_text === currentObject.attributes.label_text);
    
    // If the current object is not in the accumulator, add it
    // Otherwise, replace the existing object with the current object
    if (index === -1) {
      accumulator.push(currentObject);
    } else {
      accumulator[index] = currentObject;
    }
    
    return accumulator;
  }, []).sort((a, b) => a.attributes.label_text.localeCompare(b.attributes.label_text));
  
  // Return the sorted and deduplicated array
  return sortedObjects;
}
