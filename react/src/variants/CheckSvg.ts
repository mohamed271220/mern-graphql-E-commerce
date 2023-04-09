export const checkSvgVariant = {
  start: { opacity: 0 },
  end: {
    opacity: 1,
    transition: {
      opacity: { when: "beforeChildren", duration: 0.4 },
    },
  },
  exit: { opacity: 0, transition: { when: "afterChildren", duration: 0.2 } },
};

export const checkpathVariant = {
  start: { pathLength: 0, pathOffset: 1 },
  end: { pathLength: 1, pathOffset: 0, transition: { duration: 0.4 } },
  exit: { pathLength: 0, pathOffset: 1, transition: { duration: 0.4 } },
};

export const parentVarient = {
  start: {},
  end: (bool: boolean) => ({
    rotate: bool ? [0, 15, -15, 0] : "",
    transition: {
      rotate: { delay: 0, when: "beforeChildren", duration: 0.2 },
    },
  }),
  exit: { transition: { when: "afterChildren", duration: 0.2 } },
};
