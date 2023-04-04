import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
/* Screens */
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import PaintingScreen from "./screens/PaintingScreen";
import TestScreen from "./screens/TestScreen";
import CategoryScreen from "./screens/CategoryScreen";
/* Functions */
import { getAllCategoriesWithImage } from "./database/Category";
/* Context */
import { SearchContextProvider } from "./context/SearchContext";
/* Styles */
import "./App.css";

function App() {
  const [categories, setCategories] = useState();

  useEffect(() => {
    fectCategories();
  }, []);

  async function fectCategories() {
    let categoryResult = await getAllCategoriesWithImage();
    setCategories(categoryResult);
  }

  return (
    <>
      <SearchContextProvider>
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
      </SearchContextProvider>
    </>
  );
}

export default App;
