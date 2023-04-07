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
    return objects;
  } catch (error) {}
}

export async function readObjectsByPaintingId(paintingPointer) {
  let query = new Parse.Query("Object");
  query.include("Object.category_pointer")
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

