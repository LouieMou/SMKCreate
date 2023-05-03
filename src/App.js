import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
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

  useEffect(() => {
    if (currentUser) {
      fecthCategoriesWithPointer();
    }
  }, [currentUser]);

  async function fecthCategoriesWithPointer() {
    let categoriesAndObjectsResult = await getCategoriesWithPointer();
    setCategoriesAndObjects(categoriesAndObjectsResult);
    console.log(
      "This are the categories and objects",
      categoriesAndObjectsResult
    );
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
              element={<LoginScreen setCurrentUser={setCurrentUser} />}
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

            {categoriesAndObjects ? (
              <Routes>
                <Route
                  path="/"
                  element={
                    <HomeScreen
                      categories={categoriesAndObjects}
                      setBgColor={setBgColor}
                    />
                  }
                />

                <Route
                  exact
                  path="/search/:id"
                  element={
                    <SearchScreen setBgColor={setBgColor} bgColor={bgColor} />
                  }
                />
                {/* <Route path="/search/:id" element={<SearchScreen />} /> */}
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
