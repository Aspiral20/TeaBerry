import React, { FC, useEffect, useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import routesElements from "../context/routes_elements";

interface ContactsProps {

}

const Contacts: FC<ContactsProps> = ({}) => {
  const [curPath, setCurPath] = useState(window.location.pathname)
  const pathname = curPath.split('/');
  const currentRoute = routesElements.find(item => item.path === pathname[1])
  const curSubRoutes = currentRoute && currentRoute.subRoutes && currentRoute.subRoutes
  const contextRoute = curSubRoutes && curSubRoutes.map(item => (item.element));

  useEffect(() => {
    setCurPath(window.location.pathname)
  }, [window.location.pathname])

  return (
    <div>
      Contacts
      <div>
        {curSubRoutes && curSubRoutes.map(({ id, path, value }) => (
          <div key={id}>
            <Link key={id} to={`${curPath}/${path}`}>{value}</Link>
          </div>
        ))}
      </div>
      <Outlet context={contextRoute}/>
    </div>
  );
};

export default Contacts;