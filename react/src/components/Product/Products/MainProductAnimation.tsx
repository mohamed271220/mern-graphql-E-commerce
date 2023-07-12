import React from "react";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const scaleArr = [1.15, 1.3, 1.5, 1.3, 1.15];
const xArr = [225, 125, 0, -125, -225];
const zIndexArr = [1, 2, 3, 2, 1];
const delayArr = [0.8, 0.4, 0.2, 0.4, 0.8];
const imgArr = [
  "https://res.cloudinary.com/domobky11/image/upload/v1682582542/Daco_4755868_a8ln06.png",
  "https://res.cloudinary.com/domobky11/image/upload/v1681798935/products/Daco_4236128.png.png",
  "https://res.cloudinary.com/domobky11/image/upload/v1681687660/products/pngfind.com-tommy-hilfiger-logo-png-2660044.png.png",
  "https://res.cloudinary.com/domobky11/image/upload/v1681798916/products/Daco_4jtfyj236560.png.png",
  "https://res.cloudinary.com/domobky11/image/upload/v1682583204/Daco_844028_e2jzoa.png",
];
const MainProductAnimation = () => {
  const variant = {
    start: (i: number) => ({
      zIndex: zIndexArr[i],
      x: xArr[i],
    }),
    end: (i: number) => ({
      zIndex: zIndexArr[i],
      x: 0,
    }),
  };
  return (
    <div className="products-animation-par">
      <>
        {[...Array(5)].map((_, i) => {
          return (
            <motion.div
              key={i}
              variants={variant}
              className="products-animate"
              style={{
                x: xArr[i],
                scale: scaleArr[i],
              }}
              custom={i}
              viewport={{ once: true }}
              initial="start"
              transition={{ delay: delayArr[i], duration: 0.4 }}
              whileInView="end"
            >
              <LazyLoadImage src={imgArr[i]} effect="blur" />
            </motion.div>
          );
        })}
      </>
    </div>
  );
};

export default MainProductAnimation;
