import React from "react";
import { NavLink } from "react-router-dom";
import "./Icon.css";

function NavLinkIcon(props) {
  return (
    <div className="nav-icon-container">
      <NavLink to={props.path}>
        {({ isActive }) => (
          <div className="nav-img-container">
            <img
              src={isActive ? props.filledIcon : props.unfilledIcon}
              onClick={props.handleClick}
              className="nav-icon-img"
            ></img>
          </div>
        )}
      </NavLink>
    </div>
  );
}
export default NavLinkIcon;
