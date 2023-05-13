import React from 'react';
import { Footer, Header } from "./layout";
import { Container } from "./_components/general";
import { useLocation } from "react-router-dom";
import Router from "./router";
import { getStringPath } from "./_utils";
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { ReducersTypes } from "./_types/store";

function App() {
  const { pathname } = useLocation()
  const routeClass = getStringPath(pathname)
  const dispatch = useDispatch()
  const themeMode = useSelector<ReducersTypes>(reducer => reducer.SiteColorMode.mode)
  const toggles = [
    { isOpen: useSelector<ReducersTypes, boolean>(prev => prev.Toggles.select_feature), field: "select_feature" }
  ]

  const getHeaderHeight = useSelector<ReducersTypes, number>(reducer => reducer.JSXElements.header.height)
  const getFooterHeight = useSelector<ReducersTypes, number>(reducer => reducer.JSXElements.footer.height)

  return (
    <div
      id="admin"
      className={`theme theme__${themeMode}`}
      onClick={() => toggles.forEach(item => item.isOpen ? dispatch({
        type: 'toggles/close',
        field: item.field
      }) : null)}
    >
      {/*<LeftBar/>*/}
      <Header/>
      <Container
        className={routeClass + ' content_block'}
        styleContainer={{
          minHeight: `calc(100vh - ${getHeaderHeight + getFooterHeight}px)`
        }}
      >
        <Router/>
      </Container>
      <Footer/>

      <ToastContainer/>
    </div>
  );
}

export default App;
