import React, { useEffect, useState } from "react";
import useIndex from "../custom/useIndex";
import useCarousel from "../custom/useCarousel";
import { AnimatePresence, Variants, motion } from "framer-motion";
import useMeasure from "react-use-measure";

// import toast from "react-hot-toast";

const bannerArr = [
  {
    image:
      "https://res.cloudinary.com/domobky11/image/upload/v1680639415/My_project_tz5dad.png",
    // image:   "https://res.cloudinary.com/domobky11/image/upload/v1680631957/23082-6-woman-model-transparent-background_qshtca.png",
    slogan: `Experience the difference with our products in action. Our
      high-quality items are designed to exceed your expectations
      and elevate your daily life.`,
    button: "see all products",
    header: "Discover the Power of Our Products",
  },
  {
    image:
      "https://res.cloudinary.com/domobky11/image/upload/v1680633213/model_with_-_laptop_xph6bv.png",
    slogan: "",
  },
  {},
  {},
  {},
];
const Banner = () => {
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
        {bannerArr.reverse().map(({ image, slogan, button, header }, index) => {
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
                  <h1>{header}</h1>
                  <p>{slogan}</p>

                  <button className="btn">{button}</button>
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
        {[0, 1, 2, 3, 4].map((dot) => {
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
