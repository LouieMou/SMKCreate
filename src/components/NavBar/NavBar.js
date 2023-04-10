import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

  const location = useLocation();
  const [navBarColor, setNavBarColor] = useState();
  const [screenColor, setScreenColor] = useState();
  const [SMKlogoSize, setSMKlogoSize] = useState("");

  useEffect(() => {
    if (location.pathname !== "/canvas" && location.pathname !== "/") {
      setNavBarColor("white");
    } else {
      setNavBarColor("black");
    }
  });

  useEffect(() => {
    if (
      location.pathname === "/canvas" ||
      location.pathname === "/profile" ||
      location.pathname === "/categories" ||
      location.pathname === "/search" ||
      location.pathname === "/test" ||
      location.pathname === "/painting"
    ) {
      setSMKlogoSize("small");
    } else {
      setSMKlogoSize("large");
    }
  }, [location.pathname]);

  useEffect(() => {
    const screenColor = getComputedStyle(document.body).getPropertyValue(
      "background-color"
    );
    setScreenColor(screenColor);
  }, [location, screenColor]);

  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  function navigateTo(path) {
    navigate(path);
  }

  return (
    <nav className="navbar-container" style={{ backgroundColor: screenColor }}>
      {SMKlogoSize === "small" ? (
        <NavIcon
          src={`./icons/explore_logo_${navBarColor}.svg`}
          handleClick={() => navigateTo("/")}
          iconWidth="118px"
        />
      ) : (
        <NavIcon
          src={`./icons/explore_logo_${navBarColor}.svg`}
          handleClick={() => navigateTo("/")}
        />
      )}

      <div className="rightside-icons">
        <NavIcon
          img_container_style={"nav-icon-img"}
          src={`./icons/back_icon_${navBarColor}.svg`}
          handleClick={() => goBack()}
        />
        <NavIcon
          img_container_style={"nav-icon-img"}
          src={`./icons/heart_unfilled_${navBarColor}.svg`}
          handleClick={props.openFavoriteList}
        />
        <NavLinkIcon
          filledIcon={`./icons/create_${navBarColor}_filled.svg`}
          unfilledIcon={`./icons/create_${navBarColor}_unfilled.svg`}
          path="/canvas"
        />
        <NavLinkIcon
          filledIcon={`./icons/profile_filled_${navBarColor}.svg`}
          unfilledIcon={`./icons/profile_unfilled_${navBarColor}.svg`}
          path="/profile"
        />
      </div>
    </nav>
  );
}

export default NavBar;
