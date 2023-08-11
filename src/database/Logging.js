import Parse from "parse";

export async function setTimeAndPath(path, seconds) {
  const currentUser = Parse.User.current();
  const seconds_tracked = seconds;
  const path_tracked = path;

  // Get the session token for the current user
  const sessionToken = currentUser.getSessionToken();

  Parse.Cloud.run("addToSessionArrays", {
    sessionToken,
    array1ValueToAdd: path_tracked,
    array2ValueToAdd: seconds_tracked,
  }).catch((error) => {
    console.error("Error adding to arrays:", error);
  });
}

export async function setSavedObjects(savedObject) {
  const saved_object_value = savedObject;
  // Get the session token for the current user
  const currentUser = Parse.User.current();
  const sessionToken = currentUser.getSessionToken();

  // Call a Cloud Code function to update the custom column in the session
  Parse.Cloud.run("updateSavedObjects", {
    sessionToken,
    savedObject: saved_object_value,
  })
    .catch((error) => {
      console.error("Error updating custom column:", error);
    });
}

export async function updateObjectNavCount() {
  const currentUser = Parse.User.current();
  const sessionToken = currentUser.getSessionToken();

  // Call a Cloud Code function to increment the numeric column in the session
  Parse.Cloud.run("incrementNavByObjectColumn", { sessionToken })
    .catch((error) => {
      console.error("Error incrementing numeric column:", error);
    });
}

export async function setSavedPrompt(savedPrompt) {
  const saved_prompt_value = savedPrompt;
  console.log('the prompt: ', saved_prompt_value)
  // Get the session token for the current user
  const currentUser = Parse.User.current();
  const sessionToken = currentUser.getSessionToken();

  // Call a Cloud Code function to update the custom column in the session
  Parse.Cloud.run("updateUserPrompt", {
    sessionToken,
    savedPrompt: saved_prompt_value,
  }).catch((error) => {
      console.error("Error updating custom column:", error);
    });
}

export async function saveGeneratedImgUrl(savedURL) {
  const saved_url_value = savedURL;
  console.log('the url: ', saved_url_value)
  // Get the session token for the current user
  const currentUser = Parse.User.current();
  const sessionToken = currentUser.getSessionToken();

  // Call a Cloud Code function to update the custom column in the session
  Parse.Cloud.run("updateGeneratedImgUrl", {
    sessionToken,
    savedURL: saved_url_value,
  }).catch((error) => {
      console.error("Error updating custom column:", error);
    });
}

export async function setAppliedObjects(appliedObjectArray) {
  const applied_objects_array = appliedObjectArray;
  console.log('the applied objects: ', applied_objects_array)
  // Get the session token for the current user
  const currentUser = Parse.User.current();
  const sessionToken = currentUser.getSessionToken();

  // Call a Cloud Code function to update the custom column in the session
  Parse.Cloud.run("updateAppliedObjects", {
    sessionToken,
    appliedObjects: applied_objects_array,
  }).catch((error) => {
      console.error("Error updating custom column:", error);
    });
}

export async function updateAppliedFilters(filter) {
  const applied_filter = filter;
  // Get the session token for the current user
  const currentUser = Parse.User.current();
  const sessionToken = currentUser.getSessionToken();

  // Call a Cloud Code function to update the custom column in the session
  Parse.Cloud.run("updateAppliedFilters", {
    sessionToken,
    appliedFilter: applied_filter,
  })
    .catch((error) => {
      console.error("Error updating custom column:", error);
    });
}
