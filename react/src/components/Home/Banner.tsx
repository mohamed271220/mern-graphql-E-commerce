import React, { useEffect, useState, useContext, useRef } from "react";
import useIndex from "../../custom/useIndex";
import useCarousel from "../../custom/useCarousel";
import {
  AnimatePresence,
  Variants,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import useMeasure from "react-use-measure";
import useFilterCategory from "../../custom/useFilterCategory";
import { productListContext } from "../../context/FilterData";
import useFilterState from "../../custom/useFIlterState";
import BannerText from "./BannerText";
import { useAppSelector } from "../../custom/reduxTypes";
import MainImage from "../../assets/banner/4.jpg";
import LapImage from "../../assets/banner/laptop.jpg";
import FashionImage from "../../assets/banner/fashion.jpg";
import SaleImage from "../../assets/banner/sale.jpg";
import Animation from "../widgets/Animation";
import { mergeRefs } from "react-merge-refs";

const arrClrs = ["var(--gmail)", "var(--delete)", "var(--fb)", "var(--green)"];
const Banner = () => {
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const categoryfn = useFilterCategory();
  const { setProducts, setCategoryFilter } = useContext(productListContext);

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

  const [bannerIndex, setBannerIndex] = useState(2);

  let timer: number | undefined;

  const [convertNegativeToZero] = useIndex();
  const [animateRef, { width }] = useMeasure();
  const ref = useRef<HTMLElement | null>(null);
  const inview = useInView(ref, { amount: "all" });
  useEffect(() => {
    if (inview) {
      timer = setTimeout(() => {
        setBannerIndex((cur) =>
          convertNegativeToZero(cur + 1, bannerArr.length)
        );
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [bannerIndex, inview]);

  const [variant, dir] = useCarousel(bannerIndex, bannerArr.length);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgWidth = useTransform(scrollYProgress, [0, 1], ["100%", "140%"]);
  return (
    <Animation>
      <section
        className="banner-par center"
        id="banner"
        ref={mergeRefs([ref, animateRef])}
      >
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
                      fn={fn}
                      key={header}
                    />
                    <div className="background"></div>

                    <div className="banner-image center ">
                      <motion.img src={image} style={{ width: bgWidth }} />
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
