export const btnHover = {
  boxShadow: "2px 2px 1px grey",
  scale: 1.01,
  transition: {
    type: "spring",
    stiffness: 200,
    damping: 7,
  },
};

export const btnTap = {
  scale: 0.9,
  transition: {
    type: "spring",
    stiffness: 200,
    damping: 7,
  },
};

export const parentVariant = {
  start: { height: 0 },
  end: {
    height: "auto",
    transition: { when: "beforeChildren", staggerChildren: 0.1, duration: 0.4 },
  },
  exit: {
    height: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
      when: "afterChildren",
      duration: 0.2,
    },
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

export const reviewCounter = {
  start: { opacity: 0, y: -5 },
  end: { opacity: 1, y: 0 },
  exit: ({ rate, count }: { count: number; rate: number }) => ({
    y: 5,
    opacity: 0,
    transition: { duration: count === rate - 1 ? 0.4 : 0.1 },
  }),
};

export const heartVariant = {
  start: (bool: boolean) => ({
    pathLength: bool ? 0 : 1,
    pathOffset: bool ? 0 : 0.1,
    stroke: "black",
  }),
  end: (bool: boolean) => ({
    pathLength: bool ? 1 : 0,
    pathOffset: bool ? 0.1 : 0,
    stroke: "red",
    transition: { duration: 0.8 },
  }),
};
