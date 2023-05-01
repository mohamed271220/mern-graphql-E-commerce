import React from "react";
import Banner from "./Banner";
import Products from "../Product/Products/Products";
import About from "../About";
import Transition from "../widgets/Transition";
import StripeSuccess from "../StripeSuccess";

const Home = () => {
  return (
    <>
      <Transition />
      <Banner />
      <Products />
      <StripeSuccess />

      <About />
    </>
  );
};

export default Home;
