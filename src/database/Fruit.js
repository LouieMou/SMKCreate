import Parse from "parse";

export async function readLabelList() {
  let categoryArray = [];
  const fruitObjects = Parse.Object.extend("Category");
  const query = new Parse.Query(fruitObjects);
  query.include("object_label");

  try {
    let labels = await query.find();

    labels.forEach((label) => {
      categoryArray.push(label);
      console.log("Labels are being parsed", categoryArray);
    });
    return categoryArray;
  } catch (error) {}
}

export async function readObjectsFromSamePainting(objectNumber) {
  const fruitObjects = Parse.Object.extend("Fruit");
  const query = new Parse.Query(fruitObjects);
  query.equalTo("object_number", objectNumber);

  try {
    let objectLabelsWithObjectNumber = await query.find();
    var uniqueLabels = objectLabelsWithObjectNumber.filter(
      (value, index, array) => array.indexOf(value) === index
    );

    console.log("Objectlabels are being parsed", uniqueLabels);
    return objectLabelsWithObjectNumber;
  } catch (error) {}
}
