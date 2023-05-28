import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
/* Components */
import NavLinkIcon from "../NavBarIcon/NavLinkIcon";
import NavIcon from "../NavBarIcon/NavIcon";
/* Styles */
import "./NavBar.css";

function NavBar(props) {
  const location = useLocation();
  const [navBarTextColor, setNavBarTextColor] = useState();
  const [SMKlogoSize, setSMKlogoSize] = useState("");

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/profile") {
      setNavBarTextColor("black");
      setSMKlogoSize("large");
    } else {
      setNavBarTextColor("white");
      setSMKlogoSize("small");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/canvas") {
      setNavBarTextColor("black");
      setSMKlogoSize("large");
    }
  }, [location.pathname]);

  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  function navigateTo(path) {
    navigate(path);
  }

  return (
    <nav
      className="navbar-container"
      style={{ backgroundColor: props.bgColor }}
    >
      {SMKlogoSize === "small" ? (
        <NavIcon
          src={`icons/create_logo_${navBarTextColor}.svg`}
          handleClick={() => navigateTo("/")}
          iconWidth="118px"
        />
      ) : (
        <NavIcon
          src={`icons/create_logo_${navBarTextColor}.svg`}
          handleClick={() => navigateTo("/")}
        />
      )}

      <div className="rightside-icons">
        <NavIcon
          img_container_style={"nav-icon-img"}
          src={`icons/back_icon_${navBarTextColor}.svg`}
          handleClick={() => goBack()}
        />
        {location.pathname === "/canvas" ? (
          <NavIcon
            img_container_style={"nav-icon-img"}
            src={`icons/heart_filled_${navBarTextColor}.svg`}
          />
        ) : (
          <NavIcon
            img_container_style={"nav-icon-img"}
            src={`icons/heart_unfilled_${navBarTextColor}.svg`}
            handleClick={props.openFavoriteList}
          />
        )}

        <NavLinkIcon
          filledIcon={`icons/create_${navBarTextColor}_filled.svg`}
          unfilledIcon={`icons/create_${navBarTextColor}_unfilled.svg`}
          path="/canvas"
        />

        <NavLinkIcon
          filledIcon={`icons/profile_filled_${navBarTextColor}.svg`}
          unfilledIcon={`icons/profile_unfilled_${navBarTextColor}.svg`}
          path="/profile"
        />
      </div>
    </nav>
  );
}

export default NavBar;
