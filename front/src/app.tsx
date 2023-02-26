import React, { Fragment, useContext, useEffect } from 'react';
import Router from "./router";
import { Header, Footer } from "./layout";
import { Container } from "./_components";
import { useLocation } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getStringPath from "./utils/get_string_path";
import { StoreContext } from "./index";

function App() {
  const {store} = useContext(StoreContext)
  const { pathname } = useLocation()
  const routeClass = getStringPath(pathname)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.authStore.checkAuth().catch(err => console.log(err || "Something went wrong!"))
    }
  }, [])

  return (
    <Fragment>

      <Header/>
      <Container className={routeClass}>
        <Router/>
      </Container>
      <Footer/>

      <ToastContainer/>
    </Fragment>
  );
}

export default App;