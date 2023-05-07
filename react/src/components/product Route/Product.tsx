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

  // const { data, error, loading } = useQuery(GET_Product_By_Id, {
  //   variables: { id },
  // });

  const [singleProduct, setSingleProduct] = useState<any>({ _id: "" });
  const { Allproducts } = useAppSelector((st) => st.Allproducts);

  useEffect(() => {
    console.log("useeffect of product outside");

    if (Allproducts?.length >= 1) {
      console.log("useeffect of product");
      const pro = Allproducts.find((product: any) => product._id === id);
      console.log({ pro });

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
                  // rateIndex={rateIndex}
                  // setRateIndex={setRateIndex}
                  // hasReview={hasReview}
                />
                <AnimatePresence mode="wait">
                  {showPop && (
                    <Reviews key={`review-${_id}`} setShowPop={setShowPop} />
                  )}
                </AnimatePresence>
              </section>
              {/* <SLiderComponent /> */}
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
