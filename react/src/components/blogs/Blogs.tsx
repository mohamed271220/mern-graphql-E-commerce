import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { getAllBlogs } from "../../graphql/blog";
import Blog from "./MainBlog";
import { BlogInterface } from "../../interfaces/blog.js";
import { useAppDispatch, useAppSelector } from "../../custom/reduxTypes";
import { addToBlogsRedux } from "../../redux/BlogsSlice";

const Blogs = () => {
  const { blogs } = useAppSelector((st) => st.blogs);
  const { data } = useQuery(getAllBlogs);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data?.blogs && !blogs.length) {
      dispatch(addToBlogsRedux(data.blogs));
    }
  }, [data]);
  return (
    <div className="blogs">
      <h2 className="underline header">blogs</h2>
      <>
        {data?.blogs?.map((blog: BlogInterface, i: number) => {
          return <Blog key={i} i={i} {...blog} />;
        })}
      </>
    </div>
  );
};

export default Blogs;
