import Parse from "parse";

export const getCurrentUser = async function (setCurrentUser) {
  const currentUser = await Parse.User.current();
  // Update state variable holding current user
  setCurrentUser(currentUser);
  return currentUser;
};
