import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const BannerImg = ({ img }: { img: string }) => {
  return <LazyLoadImage src={img} effect="blur" />;
};

export default BannerImg;
