import React from 'react';
import { setBackgroundColor } from "../functions/background";

function ProfileScreen(props) {
    const green = getComputedStyle(document.documentElement).getPropertyValue(
    "--SMK-green"
  );
  setBackgroundColor(green);
    return (
        <div>
            <p style={{marginLeft: 40}}>This is the Profile Screen</p>
        </div>
    );
}

export default ProfileScreen;