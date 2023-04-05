import React from "react";
/* Components */
import PageHeading from "../components/Headings/PageHeading";
/* Functions */
import { setBackgroundColor } from "../functions/background";

function ProfileScreen(props) {
  const green = getComputedStyle(document.documentElement).getPropertyValue(
    "--SMK-green"
  );
  setBackgroundColor(green);
  return (
    <div>
      <PageHeading
        title="This is the Profile Screen"
        subtitle="Design and data will soon be updated"
        color={`var(--primary-white)`}
      />
    </div>
  );
}

export default ProfileScreen;
