import React from "react";
import Loading from "./components/Loading";
import "./styles/App.scss";
import Login from "./components/login";
import Nav from "./components/Nav";
import SignUp from "./components/SignUp";
import { BrowserRouter } from "react-router-dom";
import Product from "./components/Product/Product";
const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Loading /> */}
        <Nav />
        {/* <Login /> */}
        <Product />
        {/* <SignUp /> */}
      </div>
    </BrowserRouter>
  );
};

export default App;
