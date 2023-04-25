import React, { useEffect, useState, useContext } from "react";
import useIndex from "../../custom/useIndex";
import useCarousel from "../../custom/useCarousel";
import { AnimatePresence, Variants, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import useFilterCategory from "../../custom/useFilterCategory";
import { productListContext } from "../../context/FilterData";
import { Link } from "react-scroll";
import useFilterState from "../../custom/useFIlterState";
import { useLazyQuery } from "@apollo/client";
import { Get_All_Products } from "../../graphql/general";
import { btnHover, btnTap } from "../../variants/globals";
const arrClrs = ["darkblue", "var(--green)", "var(--delete)", "var(--sale)"];

const Banner = () => {
  const categoryfn = useFilterCategory();
  const { setProducts, setCategoryFilter } = useContext(productListContext);
  const [getAll] = useLazyQuery(Get_All_Products);

  const filterStateFn = useFilterState();

  const handleCategory = (category: string) => {
    categoryfn({ variables: { category } }).then(({ data }) => {
      setProducts(data.filterBycatageory);
      setCategoryFilter(category);
    });
  };

  const handleState = (state: string) => {
    filterStateFn({ variables: { state } }).then(({ data }) => {
      setProducts(data.filterByState);
      setCategoryFilter(state);
    });
  };

  const handleGetAllProducts = () => {
    getAll().then(({ data }) => setProducts(data.products));
  };

  const bannerArr = [
    {
      image:
        "https://res.cloudinary.com/domobky11/image/upload/v1681712865/pngfind.com-shrug-png-3162414_wpbshx.png",
      slogan: `Experience the difference with our products in action. Our high-quality items are designed to exceed your expectations and elevate your daily life.`,
      button: "shop now",
      header: "Enhance Your Daily Experience",
      to: "products",
      fn: () => handleGetAllProducts(),
    },
    {
      image:
        "https://res.cloudinary.com/domobky11/image/upload/v1680639415/My_project_tz5dad.png",

      header: "Elevate your wardrobe game",
      slogan:
        "Stay Ahead of the Fashion Curve with Our Affordable and On-Trend Styles Look Great Without Breaking the Bank - Shop Our Fashion-Forward Collection",
      button: "Watch Fashion Collection",
      to: "products",
      fn: () => handleCategory("fashion"),
    },

    {
      image:
        "https://res.cloudinary.com/domobky11/image/upload/v1681711640/139536-using-smiling-laptop-girl-png-download-free_nfifxo.png",
      slogan:
        "Unlock Your Potential with Our Range of High-Performance Laptops. From sleek ultrabooks to powerful gaming laptops, we've got you covered.",
      button: "see our laptops",
      header: "Stay Connected and Productive",
      to: "products",
      fn: () => handleCategory("laptops"),
    },

    {
      slogan:
        "Don't miss out on our limited time offer! Shop now and enjoy huge savings on our top products. From electronics to fashion,Hurry, this offer won't last forever!",
      header: "Save Big on Our Top Products",
      button: "watch Sale Products",
      image:
        "https://res.cloudinary.com/domobky11/image/upload/v1681714243/pngegg_exmpip.png",
      to: "products",
      fn: () => handleState("sale"),
    },
  ];
  const [bannerIndex, setBannerIndex] = useState(0);

  let timer: number | undefined;

  const [convertNegativeToZero] = useIndex();

  useEffect(() => {
    timer = setTimeout(() => {
      setBannerIndex((cur) => convertNegativeToZero(cur + 1, bannerArr.length));
    }, 4000);

    return () => clearTimeout(timer);
  }, [bannerIndex]);

  const [variant, dir] = useCarousel(bannerIndex, bannerArr.length);
  const [animateRef, { width }] = useMeasure();

  return (
    <section className="banner-par center" ref={animateRef}>
      <AnimatePresence custom={{ dir, width }} mode="wait">
        {bannerArr
          .reverse()
          .map(({ image, slogan, button, header, to, fn }, index) => {
            if (index === bannerIndex) {
              return (
                <motion.div
                  variants={variant as Variants}
                  className="banner "
                  key={index}
                  initial="start"
                  exit="exit"
                  animate="end"
                  custom={{ dir, width }}
                >
                  <div className="banner-content center">
                    <h1 style={{ color: `${arrClrs[index]}` }}>{header}</h1>
                    <div
                      className="background"
                      style={{
                        background: arrClrs[bannerIndex],
                        opacity: 0.5,
                      }}
                    ></div>
                    <p>{slogan}</p>

                    <div className="product-links center">
                      <motion.div
                        className="btn"
                        whileHover={btnHover}
                        whileTap={btnTap}
                        style={{ padding: "4px 0" }}
                      >
                        <Link
                          to={to}
                          smooth
                          style={{
                            background: `linear-gradient(30deg, var(--wheat), ${arrClrs[index]})`,
                            cursor: "pointer",
                          }}
                          className="btn "
                          onClick={fn}
                        >
                          {button}
                        </Link>
                      </motion.div>
                      <button className="btn  about">About us</button>
                    </div>
                  </div>
                  <div className="banner-image center ">
                    <img src={image} alt="" />
                  </div>
                </motion.div>
              );
            }
          })}
      </AnimatePresence>
      <div className="banner-dots-par center">
        {[0, 1, 2, 3].map((dot) => {
          return (
            <span
              onClick={() => {
                setBannerIndex(dot);
              }}
              key={dot}
              className={`banner-dot ${dot === bannerIndex ? "active" : ""}`}
            ></span>
          );
        })}
      </div>
    </section>
  );
};

export default Banner;