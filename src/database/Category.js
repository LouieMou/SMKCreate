import Parse from "parse";

export async function readLabelsInCategory(categoryName) {
  let labelsAndCategoryId = []
  let query = new Parse.Query("Category");
  query.include("labels");
  query.equalTo("category_name", categoryName)

  try {
    let categoryResult = await query.find();
    console.log("Category object has been parse", categoryResult)
    let labelArray = categoryResult[0].attributes.labels;
    
    labelArray.forEach((label) => {
    labelsAndCategoryId.push({objectLabel: label, categoryId: categoryResult[0].get('id'), categoryName: categoryResult[0].attributes.category_name});
    });
    return labelsAndCategoryId;
  } catch (error) {}
}