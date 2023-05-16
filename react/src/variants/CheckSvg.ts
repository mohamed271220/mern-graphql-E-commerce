export const checkSvgVariant = {
  start: { opacity: 0 },
  end: (index?: number) => ({
    opacity: 1,
    transition: {
      // opacity: {
      // duration: 0.4,
      // },
      delay: index ? 0.025 * index : 0,
      when: "beforeChildren",
    },
  }),
  exit: (index?: number) => ({
    opacity: 0,
    transition: {
      when: "afterChildren",
      // duration: 0.2,
      delay: index ? 0.02 * index : 0,
    },
  }),
};

export const checkpathVariant = {
  start: { pathLength: 0, pathOffset: 1 },
  end: (index: number) => ({
    pathLength: 1,
    pathOffset: 0,
    transition: {
      //  duration: 0.4,
      delay: index ? index * 0.025 : 0,
    },
  }),
  exit: (index: number) => ({
    pathLength: 0,
    pathOffset: 1,
    transition: {
      // duration: 0.4,
      delay: index ? index * 0.02 : 0,
    },
  }),
};

interface parentVarientParam {
  filter: string;
  isChecked: string;
  index?: number;
}

export const parentVarient = {
  start: {},
  end: ({ filter, isChecked, index }: parentVarientParam) => ({
    rotate: filter === isChecked ? [0, 15, -15, 0] : "",
    transition: {
      rotate: {
        when: "beforeChildren",
        duration: 0.3,
      },
      delay: index ? index * 0.025 : 0,
    },
  }),
  exit: ({ index }: parentVarientParam) => ({
    transition: {
      when: "afterChildren",
      duration: 0.2,
      delay: index ? index * 0.1 : 0,
      staggerDirection: index ? -1 : 1,
    },
  }),
};
