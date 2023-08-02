import Parse from "parse";

export async function updateTimeTracking(timeAndPath){
const newTimeTracking = timeAndPath;
  // Creates a new Todo parse object instance
  let Logging = new Parse.Object('Logging');
  Logging.set('time_test', newTimeTracking);
  try {
    await Logging.save();
    console.log('Logging succesful: ', newTimeTracking);
    // Success
    // Refresh to-dos list to show the new one (you will create this function later)
    return true;
  } catch (error) {
    // Error can be caused by lack of Internet connection
    alert(`Error! ${error.message}`);
    return false;
  };
}

export async function setTimeAndPath(path, seconds){

  const currentUser = Parse.User.current();
  const seconds_tracked = seconds;
  const path_tracked = path;

  // Get the session token for the current user
  const sessionToken = currentUser.getSessionToken();

  Parse.Cloud.run('addToSessionArrays', {
    sessionToken,
    array1ValueToAdd: path_tracked,
    array2ValueToAdd: seconds_tracked
  })
    .catch((error) => {
      console.error('Error adding to arrays:', error);
    });
}

export async function updateTimeWithSession(timeAndPath){
  const currentUser = Parse.User.current();
  const newTimeTracking = timeAndPath;
  // Get the session token for the current user
  const sessionToken = currentUser.getSessionToken();
  // Call a Cloud Code function to update the custom column in the session
  /* Parse.Cloud.run('updateSessionCustomColumn', { sessionToken, customColumnValue: newTimeTracking })
    .then((result) => {
      console.log('Custom column updated:', result);
    })
    .catch((error) => {
      console.error('Error updating custom column:', error);
    }); */

  Parse.Cloud.run('addToSessionArray', { sessionToken, valueToAdd: newTimeTracking })
    .then((result) => {
      console.log('Value added to array:', result);
    })
    .catch((error) => {
      console.error('Error adding to array:', error);
    });
}