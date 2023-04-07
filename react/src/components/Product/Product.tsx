import React, { createContext, useState } from "react";
import ProductImages from "./images";
import ProductDetails from "./ProductDetails";
import { useQuery } from "@apollo/client";
import { GET_Product_By_Id } from "../../graphql/general.js";
import Reviews from "./Reviews";
import { reviewInterface } from "../../interfaces/product";
import { AnimatePresence } from "framer-motion";

export interface productContextInterface {
  rating: number[];
  reviews: reviewInterface[];
}
export const productContext = createContext({} as productContextInterface);

const Product = () => {
  const [bigImgInd, setBigImgInd] = useState(0);

  const id = "642a06258b0a1b45ebf05639";
  const { data, error, loading } = useQuery(GET_Product_By_Id, {
    variables: { id },
  });

  const [showPop, setShowPop] = useState(false);

  if (loading) {
    return <>loading</>;
  } else {
    const {
      images,
      _id,
      title,
      description,
      category,
      price,
      rating,
      stock,
      reviews,
    } = data.product;

    console.log({ bigImgId: images });
    console.log({ bigImgId: images[bigImgInd] });
    console.log({ bigImgId: images[bigImgInd]._id });

    return (
      <>
        {data && (
          <productContext.Provider value={{ rating, reviews }}>
            <div className="product-container">
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
                  data={{
                    title,
                    description,
                    category,
                    price,
                    rating,
                    stock,
                    setShowPop,
                    _id,
                    bigImgId: images[bigImgInd]._id,
                  }}
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
  }
};

export default Product;
