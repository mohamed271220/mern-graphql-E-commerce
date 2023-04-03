export const btnHover = {
  // borderRadius: "10px 4px",
  boxShadow: "2px 2px 1px grey",
  scale: 1.01,
  transition: {
    type: "spring",
    stiffness: 200,
    // boxShadow: { type: delay: 0.3, duration: 0.2 },
    // mass: 2,
    damping: 7,
  },
};

export const opacityVariant = {
  start: { opacity: 0 },
  end: { opacity: 1 },
  exit: { opacity: 0 },
};
