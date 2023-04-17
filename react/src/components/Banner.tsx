import React, { useEffect, useState } from "react";
import useIndex from "../custom/useIndex";
import useCarousel from "../custom/useCarousel";
import { AnimatePresence, Variants, motion } from "framer-motion";
import useMeasure from "react-use-measure";

// import toast from "react-hot-toast";

const bannerArr = [
  {
    image:
      "https://res.cloudinary.com/domobky11/image/upload/v1681712865/pngfind.com-shrug-png-3162414_wpbshx.png",
    slogan: `Experience the difference with our products in action. Our
      high-quality items are designed to exceed your expectations
      and elevate your daily life.`,
    button: "see all products",
    header: "Discover the Power of Our Products",
  },
  {
    image:
      "https://res.cloudinary.com/domobky11/image/upload/v1681711640/139536-using-smiling-laptop-girl-png-download-free_nfifxo.png",
    slogan:
      "Unlock Your Potential with Our Range of High-Performance Laptops. From sleek ultrabooks to powerful gaming laptops, we've got you covered.",
    button: "see our laptops",
    header: "Stay Connected and Productive",
  },
  {
    image:
      "https://res.cloudinary.com/domobky11/image/upload/v1680639415/My_project_tz5dad.png",

    header: "Elevate your wardrobe game",
    slogan:
      "Stay Ahead of the Fashion Curve with Our Affordable and On-Trend Styles Look Great Without Breaking the Bank - Shop Our Fashion-Forward Collection",
    button: "shop Now",
  },
  {
    slogan:
      "Don't miss out on our limited time offer! Shop now and enjoy huge savings on our top products. From electronics to fashion,Hurry, this offer won't last forever!",
    header: "Save Big on Our Top Products",
    button: "shop Now",
    image:
      "https://res.cloudinary.com/domobky11/image/upload/v1681714243/pngegg_exmpip.png",
  },
];

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
                      className="btn shadow"
                    >
                      {button}
                    </button>
                    <button className="btn btn-about shadow">About us</button>
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
