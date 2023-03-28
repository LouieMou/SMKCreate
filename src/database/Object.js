import Parse from "parse";

export async function readObjectsByCategory(categoryId) {
  let query = new Parse.Query("Object");

  query.include("Object.painting_pointer");
  query.include("labels");
  query.include("label_text");
  query.include("object_url");
  query.equalTo("category_id", categoryId);

  try {
    let objects = query.find();
    console.log("Objects are being parsed", objects);
    return objects;
  } catch (error) {}
}

export async function readObjectsByPaintingId(paintingPointer) {
  let query = new Parse.Query("Object");
  query.include("Object.category_pointer")
  query.equalTo("painting_id_back4app", paintingPointer);

  /* function deStructureObject(object) {
    const destructuredobject = {
      coords: object[0].attributes.coords,
      label_text: object[0].attributes.label_text,
    };
    return destructuredobject;
  } */

  try {
    let objects = await query.find();
    /* let destructredObjects = objects.map(deStructureObject)
    console.log("these are the objects after destructuring", destructredObjects) */
    return objects;
  } catch (error) {}
}
