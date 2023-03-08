import React, { lazy } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import { Loadable } from "./_utils";

const ErrorPage = Loadable(lazy(() => import("./pages/error_page")))
const Main = Loadable(lazy(() => import("./pages/main")))
const Products = Loadable(lazy(() => import("./pages/products")))
const Help = Loadable(lazy(() => import("./pages/help")))

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <Main/>,
    },
    {
      path: "/commerce",
      element: <Outlet/>,
      children: [
        {
          path: "catalog", element: <Outlet/>, children: [
            { path: "products", element: <Products/> }
          ]
        }
      ]
    },
    {
      path: "/help",
      element: <Help/>,
    },
    {
      path: "*",
      element: <ErrorPage/>,
    }
  ])
}

export default Router