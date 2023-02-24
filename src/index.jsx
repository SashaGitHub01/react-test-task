import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";

const rootView = document.getElementById("root");

if (rootView) {
  ReactDOM.render(<App />, rootView);
}
