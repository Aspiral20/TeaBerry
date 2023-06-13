import React, { Fragment, useContext, useEffect, useState } from 'react';
import Router from "./router";
import { Footer, Header } from "./layout";
import { Container, Fon } from "./_components";
import { useLocation } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkValid, getStringPath } from "./_utils";
import { StoreContext } from "./index";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from 'uuid';
import { AdaptiveMenu } from "./layout";
import { SiteBkgItemType, SiteBkgType } from "./_types";

const siteBkg = [
  { id: uuid(), path: '/auth/login', image: 'auth/login_nature1_bkg.jpg' },
  { id: uuid(), path: '/auth/registration', image: 'auth/login_nature1_bkg.jpg' },
  { id: uuid(), path: '/', image: 'home/fon2_bkg.jpg' },
] as SiteBkgType

const pageDisabledContainer = [
  // { id: uuid(), path: '/' },
  // { id: uuid(), path: '/shop'},
  { id: uuid(), path: '/contacts' },
]

const pageHeaderFixed = [
  // { id: uuid(), path: '/' },
  {}
]

function App() {
  const { store } = useContext(StoreContext)
  const { langStore } = store
  const { pathname } = useLocation()
  const [isDisabledContainerPage, setIsDisabledContainerPage] = useState(false);
  const routeClass = getStringPath(pathname)
  const fonImage = store.constStore.getData('fonImage')
  const headerHeight = store.constStore.getData('header').height || 0
  const footerHeight = store.constStore.getData('footer').height || 0

  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log(1)
      store.authStore.checkAuth().catch(err => console.log(err || "Something went wrong!"))
    }
  }, [])

  useEffect(() => {
    const validPath = checkValid(siteBkg, 'path', pathname)

    if (validPath) {
      const filterItem = siteBkg.filter(item => item.path === pathname)[0]
      store.constStore.setFonImage(filterItem)
    } else {
      store.constStore.setFonImage({} as SiteBkgItemType)
    }

    setIsDisabledContainerPage(checkValid(pageDisabledContainer, 'path', pathname))
    store.constStore.setHeader({ isFixed: checkValid(pageHeaderFixed, 'path', pathname) })
  }, [pathname])

  return (
    <div
      id="client"
      onClick={(e: any) => e.target.className !== 'current_lang' ? langStore.setToggleLang(false) : null}
    >
      <Fon id="main_container" className="image_fon" style={fonImage ? {
        backgroundImage: `url(/images/site/pages/${fonImage.image})`
      } : {}}>
        <Header/>
        <Fon
          id="content_container"
          style={{
            minHeight: `calc(100vh - ${headerHeight + footerHeight}px)`
          }}
        >
          <Container
            className={routeClass}
            disableContainer={isDisabledContainerPage}
          >
            <Router/>
          </Container>
        </Fon>
        <Footer/>
      </Fon>

      <AdaptiveMenu/>
      <ToastContainer/>
    </div>
  );
}

export default observer(App);