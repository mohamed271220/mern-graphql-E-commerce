import React, { useContext } from "react";
import { categoriesArr } from "../../arries";
import { Link } from "react-scroll";
import { productListContext } from "../../context/FilterData";
import useFilterCategory from "../../custom/useFilterCategory";
import { motion } from "framer-motion";
const FooterCategory = () => {
  const { setProducts, setCategoryFilter } = useContext(productListContext);
  const categoryfn = useFilterCategory();

  const handleCategory = (category: string) => {
    categoryfn({ variables: { category } }).then(({ data }) => {
      setProducts(data.filterBycatageory);
      setCategoryFilter(category);
    });
  };

  return (
    <div className="footer-category footer-links">
      <h3 className="header underline footer-head">category</h3>
      {categoriesArr.map((link, i) => {
        return (
          <motion.span key={i} whileHover={{ x: 10 }}>
            <Link
              to="products"
              style={{ cursor: "pointer" }}
              smooth
              onClick={() => {
                handleCategory(link);
              }}
            >
              {" "}
              {link}
            </Link>
          </motion.span>
        );
      })}
    </div>
  );
};

export default FooterCategory;
