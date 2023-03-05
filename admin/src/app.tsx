import React from 'react';
import { Footer, Header } from "./layout";
import { Container } from "./_components/general";
import { useLocation } from "react-router-dom";
import Router from "./router";
import { getStringPath } from "./_utils";
import { ToastContainer } from 'react-toastify';

function App() {
  const { pathname } = useLocation()
  const routeClass = getStringPath(pathname)
  return (
    <div id="admin">

      <Header/>
      <Container className={routeClass + ' content_block'}>
        <Router/>
      </Container>
      <Footer/>

      <ToastContainer/>
    </div>
  );
}

export default App;
