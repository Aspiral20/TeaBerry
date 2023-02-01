import React from 'react';
import RoutesClient from "./Routes";
import { Header, Footer } from "./layout";

function App() {
  return (
    <div>
      <Header/>
      <RoutesClient/>
      <Footer/>
    </div>
  );
}

export default App;