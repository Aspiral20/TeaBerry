import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";
import { Loadable } from "./_utils";

const ErrorPage = Loadable(lazy(() => import("./pages/error_page")))
const Main = Loadable(lazy(() => import("./pages/main")))
const Products = Loadable(lazy(() => import("./pages/subpages/products")))
const Product = Loadable(lazy(() => import("./pages/subpages/product")))
const Statistics = Loadable(lazy(() => import("./pages/subpages/statistics")))
const Users = Loadable(lazy(() => import("./pages/subpages/users")))
const Help = Loadable(lazy(() => import("./pages/help")))
const Commerce = Loadable(lazy(() => import("./pages/commerce")))
const Catalog = Loadable(lazy(() => import("./pages/catalog")))

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <Main/>,
    },
    {
      path: "/commerce",
      element: <Commerce/>,
    },
    {
      path: "/commerce/catalog",
      element: <Catalog/>,
    },
    {
      path: "/commerce/catalog/users",
      element: <Users/>,
    },
    {
      path: "/commerce/catalog/products",
      element: <Products/>,
    },
    {
      path: "/commerce/catalog/statistics",
      element: <Statistics/>,
    },
    {
      path: "/commerce/catalog/product/:id",
      element: <Product/>,
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