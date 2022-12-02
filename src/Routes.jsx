import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./auth/Auth";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Auth />}></Route>
    </Routes>
  );
}
