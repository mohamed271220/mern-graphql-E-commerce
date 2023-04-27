import React, { createContext, useEffect, useState } from "react";
import ProductImages from "./images";
import ProductDetails from "./ProductDetails";
import { useQuery } from "@apollo/client";
import { GET_Product_By_Id } from "../../graphql/general.js";
import Reviews from "./Reviews";
import { reviewInterface } from "../../interfaces/product";
import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import SLiderComponent from "../widgets/SLider";

export interface productContextInterface {
  rating: number[];
  reviews: reviewInterface[];
  bigImgInd: number;
  images: { productPath: string; _id: string }[];
  price: number;
  title: string;
  _id: string;
  description: string;
  category: string;
  stock: string;
  setAddReviews: React.Dispatch<React.SetStateAction<reviewInterface[]>>;
  startHover: boolean;
  setStartHover: React.Dispatch<React.SetStateAction<boolean>>;
  addReview: reviewInterface[];
}
export const productContext = createContext({} as productContextInterface);

const Product = () => {
  const { id } = useParams();
  const [bigImgInd, setBigImgInd] = useState(0);
  const [startHover, setStartHover] = useState(false);

  const { data, error, loading } = useQuery(GET_Product_By_Id, {
    variables: { id },
  });
  const [showPop, setShowPop] = useState(false);
  const [addReview, setAddReviews] = useState<reviewInterface[]>([]);

  useEffect(() => {
    if (data?.product?.title) {
      document.title = data.product.title;
    }
  }, [loading, data?.product?.title]);

  useEffect(() => {
    if (data?.product?.reviews) {
      setAddReviews(data?.product?.reviews);
    }
  }, [data?.product?.reviews]);

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
      stock,
      price,
      rating,
      reviews,
    } = data.product;

    return (
      <>
        {data && (
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
              setAddReviews,
              addReview,
              startHover,
              setStartHover,
            }}
          >
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
              {/* <SLiderComponent /> */}
            </div>
          </productContext.Provider>
        )}
      </>
    );
  }
};

export default Product;
