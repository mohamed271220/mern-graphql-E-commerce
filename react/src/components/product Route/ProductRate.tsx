import { BiShow } from "react-icons/bi";
import StarIcon from "../../custom SVGs/StarIcon";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import useShowTitle from "../../custom/useShowTitle";
import Title from "../widgets/Title";
import { AiFillPlusSquare } from "react-icons/ai";
import { productContext } from "./Product";
const ProductRate = ({
  avgRate,
  ratingLen,
  id = "",
}: {
  ratingLen: number;
  avgRate: number;
  id?: string;
}) => {
  return (
    <div className="product-rate center">
      <>
        {[1, 2, 3, 4, 5].map((e, i) => {
          return <StarIcon key={e} id={i} avgRate={avgRate} optional={id} />;
        })}
      </>

      <span className="shadow rate center">
        {" "}
        {avgRate >= 0 ? avgRate.toFixed(1) : "0"}
      </span>
      <span
        style={{
          color: "var(--green)",
          fontWeight: "bold",
          marginLeft: 6,
        }}
        className="shadow"
      >
        ({ratingLen >= 0 ? ratingLen : 0})
      </span>
    </div>
  );
};

export default ProductRate;
