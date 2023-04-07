import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
/* Screens */
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import PaintingScreen from "./screens/PaintingScreen";
import TestScreen from "./screens/TestScreen";
import CategoryScreen from "./screens/CategoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CanvasScreen from "./screens/CanvasScreen";
/* Components */
import NavBar from "./components/NavBar/NavBar";
import FavoriteList from "./components/FavoriteList/FavoriteList";
/* Functions */
import { getAllCategoriesWithImage } from "./database/Category";
import { getCategoriesWithPointer } from "./database/Category";
/* Context */
import { SearchContextProvider } from "./context/SearchContext";
import { FavoriteContextProvider } from "./context/FavoriteContext";
/* Styles */
import "./App.css";

function App() {
  const [categories, setCategories] = useState();
  const [categoriesWithPointer, setCategoriesWithPointer] = useState();
  const [favoriteIsActive, setFavoriteIsActive] = useState(false);

  useEffect(() => {
    fectCategories();
  }, []);

  useEffect(() => {
    fecthCategoriesWithPointer();
    if (categoriesWithPointer) {
      console.log(
        "This is the category and pointer result: ",
        categoriesWithPointer
      );
    }
  }, []);

  async function fectCategories() {
    let categoryResult = await getAllCategoriesWithImage();
    setCategories(categoryResult);
  }

  async function fecthCategoriesWithPointer() {
    let categoryWithPointerResult = await getCategoriesWithPointer();
    setCategoriesWithPointer(categoryWithPointerResult);
    console.log(
      "This is the category and pointer result: ",
      categoriesWithPointer
    );
  }

  function openFavoriteList() {
    console.log("Fave List is not True");

    setFavoriteIsActive(true);
  }

  function closeFavoriteList() {
    console.log("Fave List is not False");
    setFavoriteIsActive(false);
  }

  return (
    <>
      <SearchContextProvider>
        <FavoriteContextProvider>
          {favoriteIsActive && (
            <div className="favorite-list-container">
              <FavoriteList closeFavoriteList={closeFavoriteList} />
            </div>
          )}
          <div className="navbar-box">
            <NavBar openFavoriteList={openFavoriteList} />
          </div>
          <Routes>
            <Route
              path="/"
              element={<HomeScreen categories={categoriesWithPointer} />}
            />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/search/:id" element={<SearchScreen />} />
            <Route path="/painting" element={<PaintingScreen />} />
            <Route path="/test" element={<TestScreen />} />
            <Route path="/canvas" element={<CanvasScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route
              path="/categories"
              element={<CategoryScreen categories={categoriesWithPointer} />}
            />
          </Routes>
        </FavoriteContextProvider>
      </SearchContextProvider>
    </>
  );
}

export default App;
