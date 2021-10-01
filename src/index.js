import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/style.css";
import axios from "axios";

function setAuthToken() {
  const token = localStorage.getItem("token");

  axios.defaults.headers.common["Authorization"] = "";
  delete axios.defaults.headers.common["Authorization"];

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}
setAuthToken();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
