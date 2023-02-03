import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css'
import Store from "./store/store";
import "./styles/index.scss";
import App from "./app";
import { BrowserRouter } from "react-router-dom";

import './i18n';

const store = new Store()
interface StoreType { store: Store }
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