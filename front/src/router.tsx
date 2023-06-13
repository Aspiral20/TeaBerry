import React, { lazy, useContext } from "react";
import { useRoutes } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Loadable } from "./_utils";
import { StoreContext } from "./index";

const Home = Loadable(lazy(() => import('./_pages/home')))
const Picking = Loadable(lazy(() => import('./_pages/picking')))
const ErrorPage = Loadable(lazy(() => import('./_pages/error_page')))
const Assorts = Loadable(lazy(() => import('./_pages/assorts')))
const About = Loadable(lazy(() => import('./_pages/about')))
const Contacts = Loadable(lazy(() => import('./_pages/contacts')))
const ShopMainPage = Loadable(lazy(() => import('./_pages/shop/main_page')))
const ShopItemPage = Loadable(lazy(() => import('./_pages/shop/item_page')))
const ForgotPassword = Loadable(lazy(() => import('./_user/forgot_password')))
const Login = Loadable(lazy(() => import('./_user/login')))
const Profile = Loadable(lazy(() => import('./_user/profile/profile')))
const Registration = Loadable(lazy(() => import('./_user/registration')))
const SuccessfulRegistration = Loadable(lazy(() => import('./_user/successful_registration')))
const ProfileInfo = Loadable(lazy(() => import('./_user/profile/profile_info')))
const ProfileBasket = Loadable(lazy(() => import('./_user/profile/profile_basket')))
const EditProfile = Loadable(lazy(() => import('./_user/profile/edit_profile')))
const DiscountPage = Loadable(lazy(() => import('./_pages/discount')))

const Router = () => {
  const { store } = useContext(StoreContext)

  return useRoutes([
    {
      id: uuid(),
      path: "/",
      element: <Home/>,
    },
    {
      id: uuid(),
      path: "assorts/:type/:brand",
      element: <Assorts/>,
    },
    {
      id: uuid(),
      path: "about",
      element: <About/>,
    },
    {
      id: uuid(),
      path: "picking/:type/:brand",
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
        { id: uuid(), path: 'login', element: !store.authStore.isAuth ? <Login/> : <ErrorPage/> },
        { id: uuid(), path: 'registration', element: !store.authStore.isAuth ? <Registration/> : <ErrorPage/> },
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
      path: "shop",
      element: <ShopMainPage/>,
      children: [
        { id: uuid(), path: ':id', element: <ShopItemPage/> }
      ]
    },
    {
      id: uuid(),
      path: "profile",
      element: <Profile/>,
      children: [
        { id: uuid(), path: 'info', element: <ProfileInfo/> },
        { id: uuid(), path: 'basket', element: <ProfileBasket/> },
        { id: uuid(), path: 'edit_profile', element: <EditProfile/> },
      ]
    },
    {
      path: "/discount/:percent",
      element: <DiscountPage/>,
    },
    {
      path: "*",
      element: <ErrorPage/>,
    }
  ])
}

export default Router