import React from "react";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import Login from "./components/Login/Login";
import LoginPage from "./pages/LoginPage/LoginPage";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet, RouterProvider } from "react-router-dom";
import { router } from "./Routes/router";

const App = () => {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
