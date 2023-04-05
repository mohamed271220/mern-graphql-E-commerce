import { useAnimate } from "framer-motion";
import React, { useState } from "react";

const HeartSvg = () => {
  const [svgRef, svgAnimate] = useAnimate();

  const [addToFavorate, setAddToFavorite] = useState(false);
  return (
    <span className="heart-parent ">
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        ref={svgRef}
        onClick={() => {
          setAddToFavorite(!addToFavorate);
          svgAnimate(
            "path",
            {
              pathLength: !addToFavorate ? [0, 1] : [1, 0],
              pathOffset: !addToFavorate ? [0.4, 0] : [0, 0.4],
              stroke: "red",
            },
            { duration: 1 }
          );
        }}
      >
        <path
          stroke="black"
          d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"
        />
      </svg>
    </span>
  );
};

export default HeartSvg;

{
  /* <AnimatePresence mode="wait">
              {!addToFavorate ? (
                <motion.span
                  variants={opacityVariant}
                  initial="start"
                  animate="end"
                  exit="exit"
                  key={"add to favorite"}
                  transition={{ duration: 0.8 }}
                >
                  add to favorite
                </motion.span>
              ) : (
                <motion.span
                  variants={opacityVariant}
                  initial="start"
                  animate="end"
                  key={"remove from favorites"}
                  exit="exit"
                  transition={{ duration: 0.8 }}
                >
                  remove from favorites
                </motion.span>
              )}
            </AnimatePresence> */
}
