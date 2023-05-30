import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleBlog } from "../../graphql/blog";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BlogParagraph from "./BlogParagraph";
import { BlogPragraph } from "../../interfaces/blog";
import SuggestedBlogs from "./SuggestedBlogs";
import { motion } from "framer-motion";
const Blog = () => {
  const { id } = useParams();
  const { data } = useQuery(getSingleBlog, {
    variables: { id },
  });

  const [isLastedOneSec, setIsLastedOneSec] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLastedOneSec(false);
    }, 300);
  }, []);
  if (data?.blog) {
    const { head, intro, end, image, _id, content } = data.blog;
    return (
      <div className="blog">
        <div className="blog-details">
          <h1>{head}</h1>
          <motion.div
            className="blog-img"
            initial={{
              // top: 0,
              // right: 0,

              scale: 2,
            }}
            animate={{
              // width: "100%",
              // height: "400px",
              scale: 1,
            }}
            transition={{ duration: 0.1 }}
            style={{
              // position: isLastedOneSec ? "fixed" : "relative",
              position: "relative",
              zIndex: 9,
            }}
          >
            <LazyLoadImage effect="blur" src={image} alt={head} />
          </motion.div>
          <p>{intro}</p>
          {content.map((obj: BlogPragraph, i: number) => {
            return <BlogParagraph key={i} i={i} {...obj} />;
          })}
          <p>{end}</p>
        </div>
        <SuggestedBlogs id={id!} />
      </div>
    );
  } else {
    return <> no data</>;
  }
};

export default Blog;
