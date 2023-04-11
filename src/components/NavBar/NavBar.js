import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
/* Components */
import NavLinkIcon from "../NavBarIcon/NavLinkIcon";
import NavIcon from "../NavBarIcon/NavIcon";
/* Styles */
import "./NavBar.css";

function NavBar(props) {
  const location = useLocation();
  const [navBarColor, setNavBarColor] = useState();
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
      location.pathname === "/" ||
      location.pathname === "/canvas"
    ) {
      setSMKlogoSize("large");
    } else {
      setSMKlogoSize("small");
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
    <nav className="navbar-container" style={{ backgroundColor: props.color }}>
      {SMKlogoSize === "small" ? (
        <NavIcon
          src={`/icons/explore_logo_${navBarColor}.svg`}
          handleClick={() => navigateTo("/")}
          iconWidth="118px"
        />
      ) : (
        <NavIcon
          src={`/icons/explore_logo_${navBarColor}.svg`}
          handleClick={() => navigateTo("/")}
        />
      )}

      <div className="rightside-icons">
        <NavIcon
          img_container_style={"nav-icon-img"}
          src={`/icons/back_icon_${navBarColor}.svg`}
          handleClick={() => goBack()}
        />
        <NavIcon
          img_container_style={"nav-icon-img"}
          src={`/icons/heart_unfilled_${navBarColor}.svg`}
          handleClick={props.openFavoriteList}
        />
        <NavLinkIcon
          filledIcon={`/icons/create_${navBarColor}_filled.svg`}
          unfilledIcon={`/icons/create_${navBarColor}_unfilled.svg`}
          path="/canvas"
        />
        <NavLinkIcon
          filledIcon={`/icons/profile_filled_${navBarColor}.svg`}
          unfilledIcon={`/icons/profile_unfilled_${navBarColor}.svg`}
          path="/profile"
        />
      </div>
    </nav>
  );
}

export default NavBar;
