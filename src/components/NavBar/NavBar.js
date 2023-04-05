import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
/* Components */
import NavLinkIcon from "../NavBarIcon/NavLinkIcon";
import NavIcon from "../NavBarIcon/NavIcon";
/* Styles */
import "./NavBar.css";

function NavBar(props) {
  /* Defining the icon paths */
  const LogoBlack = "./icons/explore_logo_black.svg";
  const LogoWhite = "./icons/explore_logo_white.svg";
  const BackArrowBlack = "./icons/back_icon_black.svg";
  const BackArrowWhite = "./icons/back_icon_white.svg";
  const CreateLogoUnfilledWhite = "./icons/create_white_unfilled.svg";
  const CreateLogoFilledWhite = "./icons/create_white_filled.svg";
  const CreateLogoUnfilledBlack = "./icons/create_black_unfilled.svg";
  const CreateLogoFilledBlack = "./icons/create_black_filled.svg";
  const ProfileUnfilledWhite = "./icons/profile_unfilled_white.svg";
  const ProfileFilledWhite = "./icons/profile_filled_white.svg";
  const ProfileUnfilledBlack = "./icons/profile_unfilled_black.svg";
  const ProfileFilledBlack = "./icons/profile_filled_black.svg";
  const HeartFilledWhite = "./icons/heart_filled_white.svg";
  const HeartUnfilledWhite = "./icons/heart_unfilled_white.svg";
  const HeartUnfilledBlack = "./icons/heart_unfilled_black.svg";

  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  function showFavoriteList() {
    console.log("open favorite list");
  }

  function navigateTo(path) {
    navigate(path);
  }

  return (
    <nav className="navbar-container">
      <div className="rigt-side-icon-container">
        <NavIcon
          img_container_style={""}
          src={LogoBlack}
          handleClick={() => navigateTo("/")}
        />
      </div>
      <div className="left-side-icon-container">
        <NavIcon
          img_container_style={"nav-img-container"}
          src={BackArrowBlack}
          handleClick={() => goBack()}
        />
        <NavIcon
          img_container_style={"nav-img-container"}
          src={HeartUnfilledBlack}
          handleClick={() => showFavoriteList}
        />
        <NavLinkIcon
          filledIcon={CreateLogoFilledBlack}
          unfilledIcon={CreateLogoUnfilledBlack}
          path="/canvas"
        />
        <NavLinkIcon
          filledIcon={ProfileFilledBlack}
          unfilledIcon={ProfileUnfilledBlack}
          path="/profile"
        />
      </div>
    </nav>
  );
}

export default NavBar;
