import React, { useEffect, useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { viewFilterContext } from "./Products/Products";
import ProductFliter from "./Products/ProductFliter";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Get_All_Products } from "../../graphql/general";

const SLiderComponent = () => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 5,
    ease: "esaeInOut",
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
    autoplay: true,
  };
  const { data } = useQuery(Get_All_Products);

  // const { setroductSearchWord } = useContext(viewFilterContext);

  // useEffect(() => {
  //   setroductSearchWord("");
  // }, []);

  return (
    <>
      <h1 className="heading heading-slider">you may like </h1>

      <Slider {...settings}>
        {data?.products.map((product: any, index: number) => {
          return (
            <ProductFliter
              key={`${product._id}-list`}
              index={index}
              // {...product}
              _id={product._id}
              price={product.price}
              stock={product.stock}
              title={product.title}
              state={product.state}
              category={product.category}
              images={product.images}
              rating={product.rating}
              //   layout
            />
          );
        })}
      </Slider>
    </>
  );
};

export default SLiderComponent;
