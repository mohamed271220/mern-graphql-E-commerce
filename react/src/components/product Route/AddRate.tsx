import React, { useState } from "react";
import Star from "../Product/Products/Aside/Star";
import { motion } from "framer-motion";

interface Props {
  setRateIndex: React.Dispatch<React.SetStateAction<number>>;
  rateIndex: number;
}

const AddRate = ({ setRateIndex, rateIndex }: Props) => {
  return (
    <div className="gap center">
      {[1, 2, 3, 4, 5].map((st, i) => {
        return (
          <motion.span
            initial={{ scale: 1 }}
            key={i}
            onHoverStart={() => setRateIndex(i)}
            whileHover={{ scale: [1, 1.4, 1.2] }}
          >
            <Star bool={rateIndex >= i} />
          </motion.span>
        );
      })}
    </div>
  );
};

export default AddRate;
