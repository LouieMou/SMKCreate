import React from "react";
/* Components */
import ProfileHeader from "../components/Profile/ProfileHeader";
import Frame from "../components/FrontPageFrame/Frame";
/* Functions */
import { setBackgroundColor } from "../functions/background";
import ProfileForm from "../components/Profile/ProfileForm";
/* Styles */
import "./ProfileScreen.css";

function ProfileScreen(props) {
  const white = getComputedStyle(document.documentElement).getPropertyValue(
    "--primary-white"
  );
  setBackgroundColor(white);

  return (
    <Frame>
      <div className="profile-page">
        <ProfileHeader name={props.name} />
        <h4>Login information</h4>
        <ProfileForm label_text={"Save changes"} />
      </div>
    </Frame>
  );
}

export default ProfileScreen;
