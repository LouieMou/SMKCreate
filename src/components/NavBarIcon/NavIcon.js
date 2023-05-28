import React from "react";
import "./Icon.css";

function NavIcon(props) {
  return (
    <img
      className={props.img_container_style}
      src={props.src}
      onClick={props.handleClick}
      style={{ width: props.iconWidth, cursor: "pointer" }}
      alt="icon"
    ></img>
  );
}

export default NavIcon;
