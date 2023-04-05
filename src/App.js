import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
/* Screens */
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import PaintingScreen from "./screens/PaintingScreen";
import TestScreen from "./screens/TestScreen";
import CategoryScreen from "./screens/CategoryScreen";
/* Components */
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
      <SearchContextProvider>
        <FavoriteContextProvider>
          <Routes>
            <Route path="/" element={<HomeScreen categories={categories} />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/search/:id" element={<SearchScreen />} />
            <Route path="/painting" element={<PaintingScreen />} />
            <Route path="/test" element={<TestScreen />} />
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
