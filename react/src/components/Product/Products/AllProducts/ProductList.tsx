import React, { Fragment, useContext, useState } from "react";
import ProductFliter from "./ProductFliter";
import Pages from "../Pages";
import { motion } from "framer-motion";
import { viewContext } from "../../../../context/gridView";
import { productListContext } from "../../../../context/FilterData";
import usePagination from "../../../../custom/useNumberOfPages";
import { useAppSelector } from "../../../../custom/reduxTypes";
import NoData from "../../../widgets/NoData";
import useIsMobile from "../../../../custom/useIsMobile";
import { Grid } from "react-loader-spinner";

const ProductList = ({ isDash }: { isDash?: boolean }) => {
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const { showFilter, products, isPending } = useContext(productListContext);
  const { gridView } = useContext(viewContext);
  const [page, setPage] = useState(1);
  const { isMobile } = useIsMobile();
  const arr = isDash ? Allproducts || [] : products || [];
  const [dataShown, numberOfPages] = usePagination(8, page, arr);
  return (
    <NoData
      length={dataShown.length}
      message="no products matched"
      cls="cls-height"
    >
      {isPending ? (
        <div className="loading center text">
          <Grid
            height="25"
            width="25"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <motion.div
          className={`product-list-par ${!gridView ? "list" : "grid"} `}
          animate={{
            width:
              showFilter && !isMobile ? " calc(100% - 200px - 20px)" : "90%",
          }}
          transition={{ delay: 0.4 }}
        >
          {dataShown?.map((product: any, index: number) => {
            return (
              <Fragment key={`${product._id}-list`}>
                <ProductFliter {...product} index={index} isDash={isDash} />
              </Fragment>
            );
          })}

          <Pages
            key={"pages"}
            page={page}
            numOfPages={numberOfPages}
            setPage={setPage}
          />
        </motion.div>
      )}
    </NoData>
  );
};

export default ProductList;
