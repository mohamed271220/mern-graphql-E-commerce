import React from "react";
import Banner from "./Banner";
import Products from "../Product/Products/Products";
import About from "../About";
import Transition from "../widgets/Transition";

const Home = () => {
  return (
    <>
      <Transition />
      <Banner />
      <Products />
      <About />
    </>
  );
};

export default Home;
