import React, { useState, useContext, useRef } from "react";
import useCarousel from "../../custom/useCarousel";
import {
  AnimatePresence,
  Variants,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import useMeasure from "react-use-measure";
import useFilterCategory from "../../custom/useFilterCategory";
import { productListContext } from "../../context/FilterData";
import useFilterState from "../../custom/useFIlterState";
import BannerText from "./BannerText";
import { useAppSelector } from "../../custom/reduxTypes";
import MainImage from "/banner/model.jpg";
import LapImage from "/banner/laptop-Img.jpg";
import FashionImage from "/banner/fashion-Img.jpg";
import SaleImage from "/banner/sale-Img.jpg";
import Animation from "../widgets/Animation";

const arrClrs = ["var(--gmail)", "var(--delete)", "var(--fb)", "var(--green)"];
const Banner = () => {
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const categoryfn = useFilterCategory();
  const { setProducts, setCategoryFilter, startTransition } =
    useContext(productListContext);

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
    setProducts(Allproducts);
  };

  const bannerArr = [
    {
      image: MainImage,
      slogan: `Experience the difference with our products in action. Our high-quality items are designed to exceed your expectations and elevate your daily life.`,
      button: "shop now",
      header: "Enhance Your Daily Experience",
      to: "products",
      fn: () => handleGetAllProducts(),
    },
    {
      image: FashionImage,
      header: "Elevate your wardrobe game",
      slogan:
        "Stay Ahead of the Fashion Curve with Our Affordable and On-Trend Styles Look Great Without Breaking the Bank - Shop Our Fashion-Forward Collection",
      button: "Watch Fashion Collection",
      to: "products",
      fn: () => handleCategory("fashion"),
    },

    {
      image: LapImage,
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
      image: SaleImage,
      to: "products",
      fn: () => handleState("sale"),
    },
  ];

  const [bannerIndex, setBannerIndex] = useState(0);

  const [animateRef, { width }] = useMeasure();
  const ref = useRef<HTMLDivElement | null>(null);

  const [variant, dir] = useCarousel(bannerIndex, bannerArr.length);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], ["1", "1.4"]);
  return (
    <Animation>
      <section className="banner-par center" id="banner" ref={animateRef}>
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
                    <BannerText
                      header={header}
                      clr={arrClrs[index]}
                      button={button}
                      slogan={slogan}
                      to={to}
                      fn={() => startTransition(fn)}
                      key={header}
                    />
                    <div className="background"></div>

                    <div className="banner-image center " ref={ref}>
                      <motion.img src={image} style={{ scale }} />
                    </div>
                  </motion.div>
                );
              }
            })}
        </AnimatePresence>
        <div className=" banner-dots-par center">
          {[...Array(4)].map((_, i) => {
            return (
              <span
                onClick={() => {
                  setBannerIndex(i);
                }}
                key={i}
                className={`box-shadow banner-dot ${
                  i === bannerIndex ? "active" : ""
                }`}
              ></span>
            );
          })}
        </div>
      </section>
    </Animation>
  );
};

export default Banner;
