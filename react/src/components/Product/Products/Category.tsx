import React from "react";
import Checkbox from "../../../custom/checkbox";

const categoriesArr = ["fashion", "laptops", "mobiles"];

const Category = () => {
  return (
    <div className="category-par center ">
      <h4 className="filter-head">categoty</h4>
      {categoriesArr.map((category, i) => {
        return (
          <div key={i} className="center category">
            <Checkbox /> {category}{" "}
          </div>
        );
      })}

      <div className="hr"></div>
    </div>
  );
};

export default Category;
