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

interface parentVarientParam {
  filter: string;
  isChecked: string;
}

export const parentVarient = {
  start: {},
  end: ({ filter, isChecked }: parentVarientParam) => ({
    rotate: filter === isChecked ? [0, 15, -15, 0] : "",
    transition: {
      rotate: { delay: 0, when: "beforeChildren", duration: 0.3 },
    },
  }),
  exit: { transition: { when: "afterChildren", duration: 0.2 } },
};
