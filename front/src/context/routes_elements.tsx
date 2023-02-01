import { Assorts, Contacts, ErrorPage, Home, Picking } from "../_pages";
import { v4 as uuid } from 'uuid'
import { Login, Registration, Profile } from "../_user";

// Routes & Header
const routesElements = [
  {
    id: uuid(),
    path: "/",
    element: <Home/>,
    header: false,
  },
  {
    id: uuid(),
    path: "assorts",
    element: <Assorts/>,
    header: true,
    value: 'assorts',
  },
  {
    id: uuid(),
    path: "picking",
    element: <Picking/>,
    header: true,
    value: 'picking',
  },
  {
    id: uuid(),
    path: "contacts",
    element: <Contacts/>,
    header: true,
    value: 'contacts',
  },
  {
    id: uuid(),
    path: "auth",
    subRoutes: [
      { id: uuid(), path: 'login', element: <Login/>, value: 'Login' },
    ],
    header: false,
  },
  {
    id: uuid(),
    path: "registration",
    element: <Registration/>,
    header: false,
  },
  {
    id: uuid(),
    path: "profile",
    element: <Profile/>,
    header: false,
  },
  {
    path: "*",
    element: <ErrorPage/>,
    header: false,
  }
]

export default routesElements