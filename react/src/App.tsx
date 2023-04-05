import React from "react";
import Loading from "./components/Loading";
import "./styles/App.scss";
import Nav from "./components/Nav";
import { BrowserRouter } from "react-router-dom";
import Product from "./components/Product/Product";
import AppRoutes from "./components/routes";
const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Loading /> */}
        <Nav />
        <Product />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
};

export default App;
