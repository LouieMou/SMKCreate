import Parse from "parse";

function destructurePaintingObject(painting){

}

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
