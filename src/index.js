import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Parse from "parse";

const PARSE_HOST_URL = "https://parseapi.back4app.com/";

const PARSE_APPLICATION_ID = 'yws2ABGKseUPOY61aVkDDMByZzKnd9VVtkvRCiH5';
const PARSE_JAVASCRIPT_KEY = '9CacsrK36MfAy54pVssJoA4IdhISOyXXTGJsnW80';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);


Parse.serverURL = PARSE_HOST_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
