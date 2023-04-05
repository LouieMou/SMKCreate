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
import FavoriteBoard from "./components/FavoriteBoard/FavoriteBoard";
/* Functions */
import { getAllCategoriesWithImage } from "./database/Category";
/* Context */
import { SearchContextProvider } from "./context/SearchContext";
import { FavoriteContextProvider } from "./context/FavoriteContext";
/* Styles */
import "./App.css";

function App() {
  const [categories, setCategories] = useState();
  const [board, setBoard] = useState(true);

  useEffect(() => {
    fectCategories();
  }, []);

  async function fectCategories() {
    let categoryResult = await getAllCategoriesWithImage();
    setCategories(categoryResult);
  }

  function closeFavoriteList() {
    setBoard(false);
  }

  return (
    <>
      <NavBar />
      <SearchContextProvider>
        <FavoriteContextProvider>
          <Routes>
            <Route path="/" element={<HomeScreen categories={categories} />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/search/:id" element={<SearchScreen />} />
            <Route path="/painting" element={<PaintingScreen />} />
            <Route path="/test" element={<TestScreen />} />
            <Route path="/canvas" element={<CanvasScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route
              path="/category"
              element={<CategoryScreen categories={categories} />}
            />
          </Routes>
          {board && <FavoriteBoard closeFavoriteList={closeFavoriteList} />}
        </FavoriteContextProvider>
      </SearchContextProvider>
    </>
  );
}

export default App;
