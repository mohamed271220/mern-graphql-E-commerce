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

  if (data?.blog) {
    const { head, intro, end, image, _id, content } = data.blog;
    return (
      <div className="blog">
        <div className="blog-details">
          <h1>{head}</h1>
          <motion.div className="blog-img">
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
