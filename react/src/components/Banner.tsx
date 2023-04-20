import React, { useEffect, useState } from "react";
import useIndex from "../custom/useIndex";
import useCarousel from "../custom/useCarousel";
import { AnimatePresence, Variants, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import { bannerArr } from "../arries";

// import toast from "react-hot-toast";

const arrClrs = ["darkblue", "var(--green)", "var(--delete)", "var(--star)"];
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
                  <h1 style={{ color: `${arrClrs[index]}` }}>{header}</h1>
                  <p>{slogan}</p>

                  <div className="product-links center">
                    <button
                      style={{
                        background: `linear-gradient(30deg, var(--wheat), ${arrClrs[index]})`,
                      }}
                      className="btn "
                    >
                      {button}
                    </button>
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
