import React from "react";
import { useRoutes } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Assorts, Contacts, Error_page, Home, Picking } from "./_pages";
import { Login, Profile, Registration } from "./_user";

const Router = () => {
  return useRoutes([
    {
      id: uuid(),
      path: "/",
      element: <Home/>,
    },
    {
      id: uuid(),
      path: "assorts",
      element: <Assorts/>,
    },
    {
      id: uuid(),
      path: "picking",
      element: <Picking/>,
    },
    {
      id: uuid(),
      path: "contacts",
      element: <Contacts/>,
    },
    {
      id: uuid(),
      path: "auth",
      children: [
        { id: uuid(), path: 'login', element: <Login/> },
      ],
    },
    {
      id: uuid(),
      path: "registration",
      element: <Registration/>,
    },
    {
      id: uuid(),
      path: "profile",
      element: <Profile/>,
    },
    {
      path: "*",
      element: <Error_page/>,
    }
  ])
}

export default Router