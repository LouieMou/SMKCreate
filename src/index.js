import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Parse from "parse";
import { BrowserRouter } from "react-router-dom";

const PARSE_HOST_URL = "https://parseapi.back4app.com/";

Parse.initialize(
  process.env.REACT_APP_APPLICATION_ID,
  process.env.REACT_APP_JAVASCRIPT_KEY
);

Parse.serverURL = PARSE_HOST_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
