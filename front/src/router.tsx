import React from "react";
import { useRoutes } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Assorts, Contacts, Error_page, Home, Picking } from "./_pages";
import {
  ForgotPassword,
  Login,
  Profile,
  Registration,
  SuccessfulRegistration,
  ProfileInfo,
  ProfileBasket,
  EditProfile
} from "./_user";

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
        { id: uuid(), path: 'registration', element: <Registration/> },
        { id: uuid(), path: 'successful_registered', element: <SuccessfulRegistration/> },
      ],
    },
    {
      id: uuid(),
      path: "user",
      children: [
        { id: uuid(), path: 'forgot_password', element: <ForgotPassword/> },
      ]
    },
    {
      id: uuid(),
      path: "profile",
      element: <Profile/>,
      children: [
        { id: uuid(), path: '', element: <ProfileInfo/> },
        { id: uuid(), path: 'basket', element: <ProfileBasket/> },
        { id: uuid(), path: 'edit_profile', element: <EditProfile/> },
      ]
    },
    {
      path: "*",
      element: <Error_page/>,
    }
  ])
}

export default Router