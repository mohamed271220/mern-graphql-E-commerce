import React, { createContext, useState } from "react";
import ProductImages from "./images";
import ProductDetails from "./ProductDetails";
import { useQuery } from "@apollo/client";
import { GET_Product_By_Id } from "../../graphql/general.js";
import Reviews from "./Reviews";
import { reviewInterface } from "../../interfaces/product";
import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import SLider from "../widgets/SLider";
import SLiderComponent from "../widgets/SLider";

export interface productContextInterface {
  rating: number[];
  reviews: reviewInterface[];
  bigImgInd: number;
  images: { productPath: string; _id: string }[];
  price: number;
  title: string;
  _id: string;
}
export const productContext = createContext({} as productContextInterface);

const Product = () => {
  const { id } = useParams();
  const [bigImgInd, setBigImgInd] = useState(0);

  const { data, error, loading } = useQuery(GET_Product_By_Id, {
    variables: { id },
  });
  console.log({ data, error });
  const [showPop, setShowPop] = useState(false);

  if (loading) {
    return <>loading</>;
  } else if (error?.message) {
    return <div> {error.message} </div>;
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

    return (
      <>
        {data && (
          <productContext.Provider
            value={{ _id, title, rating, reviews, images, bigImgInd, price }}
          >
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
                    // bigImgId: images[bigImgInd]._id,
                  }}
                />
                <AnimatePresence mode="wait">
                  {showPop && (
                    <Reviews key={`review-${_id}`} setShowPop={setShowPop} />
                  )}
                </AnimatePresence>
              </section>
              <SLiderComponent />
            </div>
          </productContext.Provider>
        )}
      </>
    );
  }
};

export default Product;
