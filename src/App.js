import React from "react";
import { Route, Routes } from "react-router-dom";
/* Screens */
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import PaintingScreen from "./screens/PaintingScreen";
import TestScreen from "./screens/TestScreen";
/* Context */
import { SearchContextProvider } from "./context/SearchContext";
/* Styles */
import "./App.css";

function App() {
  return (
    <>
      <SearchContextProvider>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/search/:id" element={<SearchScreen />} />
          <Route path="/painting" element={<PaintingScreen />} />
          <Route path="/test" element={<TestScreen />} />
        </Routes>
      </SearchContextProvider>
    </>
  );
}

export default App;
