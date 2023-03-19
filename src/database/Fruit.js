import Parse from "parse";

export async function readObjectList(objectCategory) {
  let categoryArray = [];
  let query = new Parse.Query("Fruit");
  query.include("label_text");
  query.equalTo("object_category", objectCategory);

  try {
    let object = await query.find();

    job.forEach(() => {
      categoryArray.push(object);
    });
    return categoryArray;
  } catch (error) {}
}


   