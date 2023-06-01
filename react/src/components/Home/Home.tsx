import React from "react";
import Banner from "./Banner";
import Products from "../Product/Products/Products";
import About from "../About";
// import Transition from "../widgets/Transition";
import StripeSuccess from "../widgets/StripeSuccess";
import Footer from "../Footer/Footer";
import NewsLetter from "../NewsLetter/NewsLetter";

const Home = () => {
  return (
    <>
      <Banner />
      <Products />
      <StripeSuccess />
      {/* <About /> */}
      <NewsLetter />
      <Footer />
    </>
  );
};

export default Home;
