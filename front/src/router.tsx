import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Loadable } from "./utils/loadable";

const Home = Loadable(lazy(() => import('./_pages/home')))
const Picking = Loadable(lazy(() => import('./_pages/picking')))
const ErrorPage = Loadable(lazy(() => import('./_pages/not_found')))
const Assorts = Loadable(lazy(() => import('./_pages/assorts')))
const Contacts = Loadable(lazy(() => import('./_pages/contacts')))

const ForgotPassword = Loadable(lazy(() => import('./_user/forgot_password')))
const Login = Loadable(lazy(() => import('./_user/login')))
const Profile = Loadable(lazy(() => import('./_user/profile/profile')))
const Registration = Loadable(lazy(() => import('./_user/registration')))
const SuccessfulRegistration = Loadable(lazy(() => import('./_user/successful_registration')))
const ProfileInfo = Loadable(lazy(() => import('./_user/profile/profile_info')))
const ProfileBasket = Loadable(lazy(() => import('./_user/profile/profile_basket')))
const EditProfile = Loadable(lazy(() => import('./_user/profile/edit_profile')))


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
      element: <ErrorPage/>,
    }
  ])
}

export default Router