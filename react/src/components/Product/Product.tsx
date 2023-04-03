import React, { createContext, useState } from "react";
import ProductImages from "./images";
import ProductDetails from "./ProductDetails";

const dummy = {
  title: "Chic Leather Jacket",
  description:
    "This chic leather jacket is perfect for any casual occasion. Made from high-quality leather, it is comfortable to wear and will make you look stylish.",
  category: "fashion",
  price: 200,
  rating: [4, 5, 4, 4, 2],
  images: [
    {
      productPath:
        "https://res.cloudinary.com/domobky11/image/upload/v1680466203/products/Black-Leather-Jacket-PNG-Image.png.png",
      ProductName: "Black-Leather-Jacket-PNG-Image.png",
      _id: "642a06258b0a1b45ebf0563a",
    },
    {
      productPath:
        "https://res.cloudinary.com/domobky11/image/upload/v1680475659/products/Leather-Jacket-PNG-Images-HD.png.png",
      ProductName: "Leather-Jacket-PNG-Images-HD.png",
      _id: "642a06258b0a1b45ebf0563b",
    },
    {
      productPath:
        "https://res.cloudinary.com/domobky11/image/upload/v1680466214/products/Leather-Jacket-PNG-Pic.png.png",
      ProductName: "Leather-Jacket-PNG-Pic.png",
      _id: "642a06258b0a1b45ebf0563c",
    },
    {
      productPath:
        "https://res.cloudinary.com/domobky11/image/upload/v1680475695/products/pngimg.com%20-%20leather_jacket_PNG53.png.png",
      ProductName: "pngimg.com - leather_jacket_PNG53.png",
      _id: "642a06258b0a1b45ebf0563d",
    },
  ],
  reviews: [
    {
      image: "https://unsplash.com/photos/iEEBWgY_6lA",
      user: "marco22",
      review: "I love this product! It's perfect for any occasion.",
      _id: "642a06258b0a1b45ebf0563e",
    },
    {
      image: "https://unsplash.com/photos/va_Opp86kfQ",
      user: "Harper44",
      review:
        "These sunglasses are amazing! They're so stylish and provide great protection from the sun.",
      _id: "642a06258b0a1b45ebf0563f",
    },
    {
      image: "https://unsplash.com/photos/Yvn3Rnp2jBo",
      user: "leo22",
      review:
        "This hair dye is so fun and vibrant. It's perfect for anyone looking to switch up their hair color.",
      _id: "642a06258b0a1b45ebf05640",
    },
    {
      image: "https://unsplash.com/photos/2EdIX-O2lkI",
      user: "Sophie33",
      review:
        "This is a must-have product for any wardrobe. It's timeless and elegant.",
      _id: "642a06258b0a1b45ebf05641",
    },
    {
      image: "https://unsplash.com/photos/c-lUYtNjqxw",
      user: "Aria19",
      review:
        "This is my new favorite product. It's so stylish and comfortable.",
      _id: "642a06258b0a1b45ebf05642",
    },
  ],
  _id: "642a06258b0a1b45ebf05639",
  __v: 0,
  stock: 40,
};
const { images, _id, title, description, category, price, rating, stock } =
  dummy;

interface productContextInterface {
  rating: number[];
}
export const productContext = createContext({} as productContextInterface);
const Product = () => {
  const [bigImgInd, setBigImgInd] = useState(0);

  return (
    <productContext.Provider value={{ rating }}>
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
            data={{ title, description, category, price, rating, stock }}
          />
        </section>
      </div>
    </productContext.Provider>
  );
};

export default Product;
