import React, { Fragment } from 'react';
import Router from "./router";
import { Header, Footer } from "./layout";
import { Container } from "./_components";
import { useLocation } from "react-router-dom";

const getStringPath = (pathname: string) => {
  let rez: string = '';
  const firstStepPath = pathname.split('/')

  if (firstStepPath.length === 1) {
    firstStepPath[0] = 'main'
  }
  firstStepPath.forEach(path => path !== '' ? rez += `${path} ` : null)

  return rez.slice(0, -1)
}

function App() {
  const { pathname } = useLocation()
  const routeClass = getStringPath(pathname)

  return (
    <Fragment>
      <Header/>
      <Container className={routeClass}>
        <Router/>
      </Container>
      <Footer/>
    </Fragment>
  );
}

export default App;