import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./fonts/Georgia/Georgia.ttf";
import "./fonts/Georgia/georgia-bold.ttf";
import "./fonts/Georgia/georgia-italic.ttf";
import "./fonts/Georgia/georgia-bold-italic.ttf";
import "./fonts/PlayfairDisplay/PlayfairDisplay-VariableFont_wght.ttf";
import "./fonts/PlayfairDisplay/PlayfairDisplay-Italic-VariableFont_wght.ttf";

import App from "./components/App";
import reportWebVitals from "./reportWebVitals";

import { LanguageProvider } from "./common/LanguageContext";

ReactDOM.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
