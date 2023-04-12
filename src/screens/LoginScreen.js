import { useState } from "react";
import Parse from "parse";

import FrontPageHeading from "../components/Headings/PageHeading";
import ProfileForm from "../components/Profile/ProfileForm";
import Frame from "../components/FrontPageFrame/Frame";
import "./LoginScreen.css";

export default function LoginScreen(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async function (e) {
    e.preventDefault();

    // Note that these values come from state variables that we've declared before
    const usernameValue = username;
    const passwordValue = password;
    try {
      const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
      // logIn returns the corresponding ParseUser object
      alert(
        `Success! User ${loggedInUser.get(
          "username"
        )} has successfully signed in!`
      );
      // To verify that this is in fact the current user, `current` can be used
      const currentUser = await Parse.User.current();
      console.log(loggedInUser === currentUser);
      // Clear input fields
      setUsername("");
      setPassword("");
      // Update state variable holding current user
      getCurrentUser(props.setCurrentUser);
      return true;
    } catch (error) {
      // Error can be caused by wrong parameters or lack of Internet connection
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    props.setCurrentUser(currentUser);
    return currentUser;
  };

  return (
    <Frame>
      <div className="loginScreen">
        <FrontPageHeading title="Login" />
        <ProfileForm
          label_text={"Login"}
          onSubmit={loginHandler}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    </Frame>
  );
}
