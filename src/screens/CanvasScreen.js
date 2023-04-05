import React from "react";
/* Components */
import PageHeading from "../components/Headings/PageHeading";
/* Functions */
import { setBackgroundColor } from "../functions/background";

function CanvasScreen(props) {
  const blue = getComputedStyle(document.documentElement).getPropertyValue(
    "--SMK-blue"
  );
  setBackgroundColor(blue);
  return (
    <div>
      <PageHeading
        title="This is the Canvas Screen"
        subtitle="Design and data will soon be updated"
        color={`var(--primary-white)`}
      />
    </div>
  );
}

export default CanvasScreen;
