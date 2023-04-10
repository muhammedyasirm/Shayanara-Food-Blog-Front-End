import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function UserAuthorization() {
  const userToken = localStorage.getItem("token");
  return userToken ? <Outlet /> : <Navigate to="/" />;
}

export default UserAuthorization;
