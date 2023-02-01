import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import routesElements from "./context/routes_elements";

const RoutesClient = () => {
  return (
    <Routes>
      {routesElements.map(({ id, path, element, subRoutes }) => (
        <Fragment key={id}>
          {subRoutes ?
            <Route path={path + '/'} element={element}>
              {subRoutes.map(({ id, path, element }) => (
                <Route key={id} path={path} element={element}/>
              ))}
            </Route>
            :
            <Route path={path} element={element}/>
          }
        </Fragment>
      ))}
    </Routes>
  )
}

export default RoutesClient