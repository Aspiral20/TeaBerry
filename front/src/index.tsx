import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css'
import "./styles/index.scss";
import App from "./app";
import { BrowserRouter } from "react-router-dom";

import './i18n';
import { StoreType } from "./_types";
import RootStore from "./store";

const store = new RootStore()
export const StoreContext = createContext<StoreType>({ store })

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StoreContext.Provider value={{
    store
  }}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StoreContext.Provider>
);