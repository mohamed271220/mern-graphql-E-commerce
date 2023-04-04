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

export const popVariant = {
  start: { y: -400 },
  end: { y: 0, transition: { duration: 0.5, delay: 0.4 } },
  exit: { y: -400, transition: { duration: 0.5 } },
};

export const overleyVariant = {
  start: { opacity: 0 },
  end: { opacity: 1, transition: { duration: 0.5, when: "beforeChildren" } },
  exit: { opacity: 0, transition: { duration: 0.5, when: "afterChildren" } },
};
