import Parse from "parse";

export async function updateTimeTracking(timeAndPath){
const newTimeTracking = timeAndPath;
  // Creates a new Todo parse object instance
  let Logging = new Parse.Object('Logging');
  Logging.set('time_test', newTimeTracking);
  try {
    await Logging.save();
    // Success
    alert('Success! Logging saved!');
    // Refresh to-dos list to show the new one (you will create this function later)
    return true;
  } catch (error) {
    // Error can be caused by lack of Internet connection
    alert(`Error! ${error.message}`);
    return false;
  };
}