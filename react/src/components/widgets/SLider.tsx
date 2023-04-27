import React, { useEffect, useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProductFliter from "../Product/Products/AllProducts/ProductFliter";
import { useQuery } from "@apollo/client";
import { Get_All_Products } from "../../graphql/general";
import { viewContext } from "../../context/gridView";

const SLiderComponent = () => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 4,
    ease: "esaeInOut",
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    autoplay: true,
  };
  const { data } = useQuery(Get_All_Products);
  const { setGridView } = useContext(viewContext);

  useEffect(() => {
    setGridView(true);
  }, []);
  return (
    <>
      <h2
        className="underline header  heading-slider"
        style={{ margin: "12px  " }}
      >
        you may like{" "}
      </h2>

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
              reviews={product.reviews}
              description={product.description}

              //   layout
            />
          );
        })}
      </Slider>
    </>
  );
};

export default SLiderComponent;
