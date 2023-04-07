import Parse from "parse";

export async function readObjectsByCategory(categoryId) {
  let destrucutredObjects = [];
  let query = new Parse.Query("Object");

  query.include("labels");
  query.include("label_text");
  query.include("object_url");
  query.equalTo("category_id", categoryId);

  function destructureObject(object) {
    let destructuredObject = {
      id: object.id,
      label_text: object.attributes.label_text,
      object_url: object.attributes.object_url,
      painting_id: object.attributes.painting_pointer.id,
      category_id: object.attributes.category_id,
    };

    return destructuredObject;
  }

  try {
    let objects = await query.find();
    objects.forEach((object) => {
      destrucutredObjects.push(destructureObject(object));
    });
    return destrucutredObjects;
  } catch (error) {}
}

export async function readObjectsByPaintingId(paintingPointer) {
  let query = new Parse.Query("Object");
  query.include("Object.category_pointer");
  query.equalTo("painting_id_back4app", paintingPointer);

  try {
    let objects = await query.find();
    return objects;
  } catch (error) {}
}

export async function readObjectsByURL(object_url) {
  let query = new Parse.Query("Object");
  query.equalTo("object_url", object_url);

  try {
    let objects = await query.find();
    return objects;
  } catch (error) {}
}
