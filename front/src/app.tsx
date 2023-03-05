import React, { useContext, useEffect } from 'react';
import Router from "./router";
import { Header, Footer } from "./layout";
import { Container } from "./_components";
import { useLocation } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getStringPath from "./utils/get_string_path";
import { StoreContext } from "./index";
import { observer } from "mobx-react-lite";

function App() {
  const { store } = useContext(StoreContext)
  const { langStore } = store
  const { pathname } = useLocation()
  const routeClass = getStringPath(pathname)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.authStore.checkAuth().catch(err => console.log(err || "Something went wrong!"))
    }
  }, [])

  console.log(langStore.toggleLang)

  return (
    <div
      id="site"
      onClick={(e: any) => e.target.className !== 'current_lang' ? langStore.setToggleLang(false) : null}
    >

      <Header/>
      <Container className={routeClass}>
        <Router/>
      </Container>
      <Footer/>

      <ToastContainer/>
    </div>
  );
}

export default observer(App);