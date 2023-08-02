import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
/* Screens */
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import PaintingScreen from "./screens/PaintingScreen";
import CategoryScreen from "./screens/CategoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CanvasScreen from "./screens/CanvasScreen";
import LoginScreen from "./screens/LoginScreen";
/* Components */
import NavBar from "./components/NavBar/NavBar";
import NavBarPlain from "./components/NavBar/NavBarPlain";
import FavoriteList from "./components/FavoriteList/FavoriteList";
import TimeTracker from "./components/Counter/TimeTracker";
/* Functions */
import { getCategoriesWithPointer } from "./database/Category";
/* Context */
import { SearchContextProvider } from "./context/SearchContext";
import { FavoriteContextProvider } from "./context/FavoriteContext";
/* Styles */
import "./App.css";

function App() {
  const [categoriesAndObjects, setCategoriesAndObjects] = useState();
  const [favoriteIsActive, setFavoriteIsActive] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [bgColor, setBgColor] = useState();
  const [routeChange, setRouteChange] = useState(null);
  const [startCounter, setStartCounter] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  /* TO SAVE THE STATE OF CANVAS-PAGE */
  const [userInput, setUserInput] = useState("");
  const [imagesOnLayer, setImagesOnLayer] = useState([]);
  const [metaDataOnLayer, setMetaDataOnLayer] = useState([]);
  const [referencesIsShown, setReferencesIsShown] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(false);

  useEffect(() => {
    if (currentUser) {
      fecthCategoriesWithPointer();
    }
  }, [currentUser]);

  async function fecthCategoriesWithPointer() {
    let categoriesAndObjectsResult = await getCategoriesWithPointer();
    setCategoriesAndObjects(categoriesAndObjectsResult);
  }

  function openFavoriteList() {
    setFavoriteIsActive(true);
  }

  function closeFavoriteList() {
    setFavoriteIsActive(false);
  }

  return (
    <>
      {currentUser === null && (
        <>
          <NavBarPlain openFavoriteList={openFavoriteList} />
          <Routes>
            <Route
              path="/"
              element={<LoginScreen setCurrentUser={setCurrentUser} setStartCounter={setStartCounter} />}
            />
          </Routes>
        </>
      )}
      {currentUser !== null && (
        <SearchContextProvider>
          <FavoriteContextProvider>
            {favoriteIsActive && (
              <div className="favorite-list-container">
                <FavoriteList closeFavoriteList={closeFavoriteList} />
              </div>
            )}

            <NavBar openFavoriteList={openFavoriteList} bgColor={bgColor} />
            {/* <Listener routeChange={routeChange} startCounter={startCounter}/> */}
            <TimeTracker startCounter={startCounter}/>

            {categoriesAndObjects ? (
              <Routes>
                <Route
                  path="/home"
                  element={<HomeScreen setBgColor={setBgColor} />}
                />
                <Route
                  exact
                  path="/search/:id"
                  element={
                    <SearchScreen setBgColor={setBgColor} bgColor={bgColor} />
                  }
                />
                <Route
                  path="/painting"
                  element={<PaintingScreen setBgColor={setBgColor} />}
                />
                <Route
                  path="/canvas"
                  element={
                    <CanvasScreen
                      closeFavoriteList={closeFavoriteList}
                      setBgColor={setBgColor}
                      setImagesOnLayer={setImagesOnLayer}
                      imagesOnLayer={imagesOnLayer}
                      setMetaDataOnLayer={setMetaDataOnLayer}
                      metaDataOnLayer={metaDataOnLayer}
                      referencesIsShown={referencesIsShown}
                      setReferencesIsShown={setReferencesIsShown}
                      setGeneratedImage={setGeneratedImage}
                      generatedImage={generatedImage}
                      userInput={userInput}
                      setUserInput={setUserInput}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProfileScreen
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                      setBgColor={setBgColor}
                    />
                  }
                />
                <Route
                  path="/categories"
                  element={
                    <CategoryScreen
                      categories={categoriesAndObjects}
                      setBgColor={setBgColor}
                    />
                  }
                />
              </Routes>
            ) : (
              <></>
            )}
          </FavoriteContextProvider>
        </SearchContextProvider>
      )}
    </>
  );
}

export default App;
