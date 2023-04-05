import React from "react";
import { IoFilter } from "react-icons/io5";
import { FcMinus } from "react-icons/fc";
import Category from "./Category";
import Rating from "./Rating";
import Price from "./Price";

const Aside = () => {
  return (
    <aside>
      <div className="aside-head center">
        <div className="filter-icon center">
          <IoFilter />
          <span className="filter-head">filter</span>
        </div>
        <div className="collapse-par center">
          <button className="btn-collapse ">collapse all</button>
          <FcMinus />
        </div>
      </div>
      <div className="hr"></div>

      <Category />
      <Rating />
      <Price />
    </aside>
  );
};

export default Aside;
