import { useState } from "react";

const useCarousel = (index: number, len: number) => {
  type Tuple = [number | null, number];

  const [tuple, setTuple] = useState<Tuple>([null, index]);
  index;
  if (tuple[1] !== index) {
    setTuple([tuple[1], index]);
  }

  let direction = "";

  if (tuple[0] !== null) {
    direction = tuple[0] > tuple[1] ? "increase" : "decrease";
  }

  if (tuple[0] !== null && tuple[0] === 0 && tuple[1] === len - 1) {
    direction = "increase";
  }

  if (tuple[0] !== null && tuple[0] === len - 1 && tuple[1] === 0) {
    direction = "decrease";
  }

  const variant = {
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

  return [variant, direction];
};

export default useCarousel;
