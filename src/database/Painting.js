import Parse from "parse";

export async function readPaintingById(paintingId) {
  let query = new Parse.Query("Painting");
  query.equalTo("objectId", paintingId);

  function deStructurePaintingObject(painting) {
    const destructuredpainting = {
      artist: painting[0].attributes.artist,
      techniques: painting[0].attributes.techniques,
      suggested_bg_color: painting[0].attributes.suggested_bg_color,
      colors: painting[0].attributes.colors,
      title: painting[0].attributes.title,
      image_thumbnail: painting[0].attributes.image_thumbnail,
      publication_year: painting[0].attributes.publication_year,
      object_labels: painting[0].attributes.object_labels,
      image_width: painting[0].attributes.image_width,
    };
    return destructuredpainting;
  }

  try {
    let queryResult = await query.find();
    let paintingResult = deStructurePaintingObject(queryResult)
    return paintingResult;
  } catch (error) {}
}


