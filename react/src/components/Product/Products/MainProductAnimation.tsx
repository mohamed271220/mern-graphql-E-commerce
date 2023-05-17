import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
      //   scale: i === 2 ? 1.4 : 1,
      zIndex: zIndexArr[i],
      scale: scaleArr[i],
      x: xArr[i],
    }),
    end: (i: number) => ({
      zIndex: zIndexArr[i],

      scale: scaleArr[i],
      x: 0,
    }),
  };
  const ref = useRef<HTMLDivElement | null>(null);
  const view = useInView(ref);
  return (
    <div className="products-animation-par" ref={ref}>
      {view && (
        <>
          {[1, 2, 3, 4, 5].map((_, i) => {
            return (
              <motion.div
                key={i}
                variants={variant}
                className="products-animate"
                style={{
                  x: xArr[i],

                  //   background: clrs[i],
                }}
                custom={i}
                initial="start"
                transition={{ delay: delayArr[i], duration: 0.4 }}
                animate="end"
              >
                <LazyLoadImage src={imgArr[i]} effect="blur" />
              </motion.div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default MainProductAnimation;
