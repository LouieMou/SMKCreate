import Parse from "parse";

export async function readLabelsInCategory(categoryName) {
  let labelsAndCategoryId = [];
  let query = new Parse.Query("Category");
  query.include("labels");
  query.equalTo("category_name", categoryName);

  try {
    let categoryResult = await query.find();
    let labelArray = categoryResult[0].attributes.labels;

    labelArray.forEach((label) => {
      labelsAndCategoryId.push({
        objectLabel: label,
        categoryId: categoryResult[0].get("id"),
        categoryName: categoryResult[0].attributes.category_name,
      });
    });
    return labelsAndCategoryId;
  } catch (error) {}
}

export async function getCategoriesWithPointer() {
  let categoryAndObject = [];
  let categoryResult;
  let query = new Parse.Query("Category");
  query.select(
    "category.id",
    "category_name",
    "object_pointer.painting_id_back4app",
    "object_pointer.label_text",
    "object_pointer.object_url"
  );

  function destructureObject(object) {
    let destructuredObject = {
      id: object.id,
      painting_id: object.attributes.painting_id_back4app,
      label_text: object.attributes.label_text,
      object_url: object.attributes.object_url,
      saved: false
    };
    return destructuredObject;
  }

  function destructureCategory(category) {
    let destructuredCategory = {
      id: category.id,
      name: category.get("category_name"),
    };
    return destructuredCategory;
  }

  try {
    categoryResult = await query.find();
    //console.log("This is the query result: ", categoryResult)
    categoryResult.forEach((category) => {
      //console.log("we are in the loop", categoryAndObject)
      categoryAndObject.push({
        category: destructureCategory(category),
        object: destructureObject(category.get("object_pointer")),
      });
    });

    //console.log("This is from the database function; ", categoryAndObject);
    return categoryAndObject;
  } catch (error) {}
}
