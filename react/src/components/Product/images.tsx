import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  data: {
    images: {
      productPath: string;
      ProductName: string;
      _id: string;
    }[];
    bigImgInd: number;
    setBigImgInd: React.Dispatch<React.SetStateAction<number>>;
  };
}

type Tuple = [number | null, number];

const ProductImages = ({
  data: { setBigImgInd, bigImgInd, images },
}: Props) => {
  const [tuple, setTuple] = useState<Tuple>([null, bigImgInd]);

  if (tuple[1] !== bigImgInd) {
    setTuple([tuple[1], bigImgInd]);
  }

  let direction = "";

  if (tuple[0] !== null) {
    direction = tuple[0] > tuple[1] ? "increase" : "decrease";
  }

  const parentVariant = {
    start: {},
    end: {},
  };

  const bigImageVariant = {
    end: (dir: string) => ({
      // x: 0,
      x: dir === "increase" ? [200, 0] : [-200, 0],

      opacity: 1,
      transition: { duration: 0.6, type: "tween", ease: "easeOut" },
    }),
    exit: (dir: string) => ({
      x: dir === "increase" ? -250 : 250,
      transition: { duration: 0.5 },
    }),
  };

  const bigImageParVariant = {
    start: { x: -200 },
    end: { x: 0, transition: { duration: 1 } },
  };
  const smallImageVariant = {
    end: (index: number) => ({
      y: [100, -10, 0],
      x: [40, -5, 0],
      opacity: [0.1, 0.5, 1],
      transition: { delay: 1.5 + 0.4 * index, duration: 0.3 },
    }),
  };

  return (
    <motion.div
      className="images center"
      variants={parentVariant}
      initial="start"
      animate="end"
    >
      <motion.div
        className="big-img-par"
        variants={bigImageParVariant}
        // initial="start"
        // animate="end"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={images[bigImgInd].productPath}
            src={images[bigImgInd].productPath}
            className="big-img"
            variants={bigImageVariant}
            custom={direction}
            exit="exit"
          />
        </AnimatePresence>
      </motion.div>
      <div className="small-img-par center">
        {images.map(({ productPath }, index) => {
          return (
            <motion.img
              custom={index}
              variants={smallImageVariant}
              className="small-img"
              src={productPath}
              key={index}
              onClick={() => setBigImgInd(index)}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProductImages;
