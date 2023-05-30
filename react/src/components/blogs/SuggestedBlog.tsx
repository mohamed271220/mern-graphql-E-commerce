import React, { useEffect, useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import OpacityBtn from "../widgets/OpacityBtn";
import { AnimatePresence, motion } from "framer-motion";
interface Props {
  head: string;
  intro: string;
  image: string;
  _id: string;
}
const SuggestedBlog = ({ head, intro, image, _id }: Props) => {
  const navigate = useNavigate();

  return (
    <div key={_id} className="suggested-blog">
      <AnimatePresence mode="wait">
        <div key={"img-par"} className="suggested-blog-img">
          <LazyLoadImage effect="blur" src={image} alt={head} />
        </div>
      </AnimatePresence>

      <h4 className="blog-head">{head.split(" ").slice(0, 7).join(" ")} ...</h4>
      <p>{intro.split(" ").slice(0, 10).join(" ")} ...</p>
      <OpacityBtn
        Icon={BiRightArrowAlt}
        btn="see more"
        cls="btn main center gap suggested-btn"
        fn={() => {
          navigate(`/blogs/${_id}`);
        }}
        pos="right"
      />
    </div>
  );
};

export default SuggestedBlog;
