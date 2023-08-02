import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
/* Components */
import NavIcon from "../NavBarIcon/NavIcon";
/* Styles */
import "./NavBar.css";

export default function NavBarPlain(props) {
  const location = useLocation();

  const [screenColor, setScreenColor] = useState();

  useEffect(() => {
    const screenColor = getComputedStyle(document.body).getPropertyValue(
      "background-color"
    );
    setScreenColor(screenColor);
  }, [location, screenColor]);

  const navigate = useNavigate();

  function navigateTo(path) {
    navigate(path);
  }

  return (
    <nav
      className="navbar-container-plain"
      style={{ backgroundColor: screenColor }}
    >
      <NavIcon
        src={`./icons/create_logo_black.svg`}
        handleClick={() => navigateTo("/home")}
      />
    </nav>
  );
}
