export function desctructurePainting(paintingId, attributes) {
  let destructuredPainting = {
    id: paintingId,
    artist: attributes.artist,
    techniques: attributes.techniques,
    suggested_bg_color: attributes.suggested_bg_color,
    colors: attributes.colors,
    title: attributes.title,
    image_thumbnail: attributes.image_thumbnail,
    publication_year: attributes.publication_year,
    object_labels: attributes.object_labels,
    image_width: attributes.image_width,
  };
  return destructuredPainting;
}
