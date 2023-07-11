import React, { useEffect, useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProductFliter from "../Product/Products/AllProducts/ProductFliter";
import { viewContext } from "../../context/gridView";
import { useAppSelector } from "../../custom/reduxTypes";

const SLiderComponent = () => {
  const { Allproducts } = useAppSelector((st) => st.Allproducts);

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
        {Allproducts?.map((product: any, index: number) => {
          return (
            <ProductFliter
              key={`${product._id}-list`}
              index={index}
              isPending={false}
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
