import React, { useState } from "react";
import Parse from "parse";
/* Components */
import ProfileHeader from "../components/Profile/ProfileHeader";
import Frame from "../components/FrontPageFrame/Frame";
/* Functions */
import { setBackgroundColor } from "../functions/background";
import ProfileForm from "../components/Profile/ProfileForm";
/* Styles */
import "./ProfileScreen.css";

function ProfileScreen(props) {
  const initialName =
    props.currentUser === null ? "" : props.currentUser.attributes.name;
  const initialUsername =
    props.currentUser === null ? "" : props.currentUser.attributes.username;
  const initialPassword =
    props.currentUser === null ? "" : props.currentUser.attributes.password;

  const [name, setName] = useState(initialName);
  const [username, setUsername] = useState(initialUsername);
  const [password, setPassword] = useState(initialPassword);

  const white = getComputedStyle(document.documentElement).getPropertyValue(
    "--primary-white"
  );
  setBackgroundColor(white);
  props.setBgColor(white);

  async function saveChangesToProfile(e) {
    e.preventDefault();
    // Create a new Todo parse object instance and set todo id
    let User = new Parse.Object("_User");
    User.set("objectId", props.currentUser.id);
    // Set new done value and save Parse Object changes
    User.set("name", name);
    User.set("username", username);
    User.set("password", password);
    try {
      await User.save();
      // Success
      alert("Success! To-do updated!");
      getCurrentUser();
      return true;
    } catch (error) {
      // Error can be caused by lack of Internet connection
      alert(`Error! ${error.message}`);
      return false;
    }
  }

  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    props.setCurrentUser(currentUser);
    return currentUser;
  };

  return (
    <Frame>
      <div className="profile-page">
        <ProfileHeader name={name} setName={setName} />
        <div className="login-info">
          <h4>Login information</h4>
          <ProfileForm
            label_text={"Save changes"}
            onSubmit={saveChangesToProfile}
            setUsername={setUsername}
            setPassword={setPassword}
            username={username}
            password={password}
          />
        </div>
      </div>
    </Frame>
  );
}

export default ProfileScreen;
