import Parse from "parse";

export async function picasso() {
  let result = await Parse.Cloud.run("picasso", {});
  return result;
}
