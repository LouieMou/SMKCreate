import React from "react";
import { Route, Routes } from "react-router-dom";
/* Screens */
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import PaintingScreen from "./screens/PaintingScreen";
/* Styles */
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/search/:id" element={<SearchScreen />} />
        <Route path="/painting" element={<PaintingScreen />} />
      </Routes>
    </>
  );
}

export default App;
