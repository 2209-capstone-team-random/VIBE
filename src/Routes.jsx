import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store";
import App from "./App";
import LoginPage from "./components/Login/LoginPage"
import Landing from "./components/Login/Landing"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route path='/intake' element={<LoginPage/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
