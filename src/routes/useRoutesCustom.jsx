import React from "react";
import { Outlet, useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import SignIn from "../pages/SignIn/SignIn";
import UserTemplate from "../template/UserTemplate/UserTemplate";
import AdminTemplate from "../template/AdminTemplate/AdminTemplate";
import MovieManager from "../pages/MovieManager/MovieManager";
import AddMovie from "../pages/AddMovie/AddMovie";
import SignUp from "../pages/SignUp/SignUp";
import UsManager from '../pages/UsManager/UsManager'
import Nhap from "../pages/Nhap/Nhap";

const useRoutesCustom = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <UserTemplate />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "sign-in",
          element: <SignIn />,
         
        },
        {
          path:"sign-up",
          element:<SignUp/>
        }
      ],
    },
    {
      path: "/admin",
      element: <AdminTemplate />,
      children: [
        {
          path: "quan-li-phim",
          element: <MovieManager />,
        },
        {
          // path: "them-phim",
          element: <AddMovie />,
          index: true,
        },
        {
          path: "them-phim",
          element: <AddMovie />,
        },
        {
          path: "quan-li-nguoi-dung",
          element: <UsManager/>
        },
        {
          path: "nhap",
          element: <Nhap/>
        },
      ],
    },
  ]);
  return routes;
};

export default useRoutesCustom;
