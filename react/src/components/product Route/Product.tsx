import React, { createContext, useContext, useEffect, useState } from "react";
import ProductImages from "./images";
import ProductDetails from "./ProductDetails";
import Reviews from "./Reviews";
import { ProductInterface, reviewInterface } from "../../interfaces/product";
import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import Transition from "../widgets/Transition";
import { useAppSelector } from "../../custom/reduxTypes";
import { isAuthContext } from "../../context/isAuth";

export interface productContextInterface extends ProductInterface {
  reviews: reviewInterface[];
  bigImgInd: number;
  startHover: boolean;
  setStartHover: React.Dispatch<React.SetStateAction<boolean>>;
}
export const productContext = createContext({} as productContextInterface);

const Product = () => {
  const { id } = useParams();
  const [bigImgInd, setBigImgInd] = useState(0);
  const [startHover, setStartHover] = useState(false);

  const [singleProduct, setSingleProduct] = useState<any>({ _id: "" });
  const { Allproducts } = useAppSelector((st) => st.Allproducts);

  useEffect(() => {
    if (Allproducts?.length >= 1) {
      const pro = Allproducts.find((product: any) => product._id === id);
      setSingleProduct(pro);
    }
  }, [Allproducts]);

  const [showPop, setShowPop] = useState(false);

  if (singleProduct?._id !== "") {
    const {
      images,
      _id,
      title,
      description,
      category,
      stock,
      price,
      rating,
      reviews,
      createdAt,
    } = singleProduct;

    return (
      <>
        {singleProduct && (
          <productContext.Provider
            value={{
              _id,
              title,
              rating,
              reviews,
              images,
              bigImgInd,
              price,
              description,
              category,
              stock,
              startHover,
              setStartHover,
              createdAt,
            }}
          >
            <Transition />
            <div className="product-container box-shadow">
              <section className="product-page">
                <ProductImages
                  key={_id}
                  data={{
                    images,
                    bigImgInd,
                    setBigImgInd,
                  }}
                />

                <ProductDetails
                  key={`product-${_id}`}
                  setShowPop={setShowPop}
                />
                <AnimatePresence mode="wait">
                  {showPop && (
                    <Reviews key={`review-${_id}`} setShowPop={setShowPop} />
                  )}
                </AnimatePresence>
              </section>
            </div>
          </productContext.Provider>
        )}
      </>
    );
  } else {
    return <> loading</>;
  }
};

export default Product;
