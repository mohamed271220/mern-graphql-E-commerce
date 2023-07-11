import React, { useEffect } from "react";
import Banner from "./Banner";
import Products from "../Product/Products/Products";
import StripeSuccess from "../widgets/StripeSuccess";
import Footer from "../Footer/Footer";
import NewsLetter from "../NewsLetter/NewsLetter";

const Home = () => {
  useEffect(() => {
    document.title = "Zimart";
  }, []);

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
