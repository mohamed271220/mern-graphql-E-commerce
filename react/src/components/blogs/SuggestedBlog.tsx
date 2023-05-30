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

  const variant = {
    exit: { transition: { when: "afterChildren" } },
    start: {},
    end: {},
  };
  const imgVar = {
    exit: {
      // top: 0,
      // zIndex: 100,
      // left: 0,
      // width: "100vw",
      // height: "100vh",
      scale: 5,
    },
  };
  const [isCLicked, setIsCLiked] = useState(false);

  return (
    <motion.div
      key={_id}
      className="suggested-blog"
      variants={variant}
      initial="start"
      animate="end"
      exit={"exit"}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={"img-par"}
          variants={imgVar}
          transition={{ duration: 0.1 }}
          className="suggested-blog-img"
          style={{
            position: "relative",
            zIndex: 10,
          }}
        >
          <LazyLoadImage effect="blur" src={image} alt={head} />
        </motion.div>
      </AnimatePresence>

      <h4 className="blog-head">{head.split(" ").slice(0, 7).join(" ")} ...</h4>
      <p>{intro.split(" ").slice(0, 10).join(" ")} ...</p>
      <OpacityBtn
        Icon={BiRightArrowAlt}
        btn="see more"
        cls="btn main center gap suggested-btn"
        fn={() => {
          navigate(`/blogs/${_id}`);
          setIsCLiked(true);
        }}
        pos="right"
      />
    </motion.div>
  );
};

export default SuggestedBlog;
