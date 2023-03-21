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
    });
    return categoryArray;
  } catch (error) {}
}

export async function readObjectsBySearchFilter(){
  const objectClass = Parse.Object.extend("Fruit");
  const query = new Parse.Query(objectClass);
  query.include("object_label");
  query.include("object_url")

  try {
    let objects = query.find()
    console.log("Objects are being parsed", objects);
    return objects;
  } catch (error) {
    
  }
}

export async function readObjectsFromSamePainting(objectNumber) {
  const fruitObjects = Parse.Object.extend("Fruit");
  const query = new Parse.Query(fruitObjects);
  //query.equalTo('object_number', objectNumber)

  try {
    let objects = await query.find();

    let objectLabelsWithObjectNumber = objects.filter(
      (object) => object.attributes.object_number === objectNumber
    );

    console.log("Objectlabels are being parsed", objectLabelsWithObjectNumber);
    return objectLabelsWithObjectNumber;
  } catch (error) {}
}
