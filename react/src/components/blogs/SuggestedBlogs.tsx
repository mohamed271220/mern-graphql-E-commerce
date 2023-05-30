import React from "react";
import { useAppSelector } from "../../custom/reduxTypes";
import SuggestedBlog from "./SuggestedBlog";

const SuggestedBlogs = ({ id }: { id: string }) => {
  const { blogs } = useAppSelector((st) => st.blogs);

  return (
    <div className="suggested-blogs">
      {blogs
        .filter((ob) => ob._id != id)
        .slice(0, 2)
        .map((ob, i) => {
          return <SuggestedBlog key={i} {...ob} />;
        })}
    </div>
  );
};

export default SuggestedBlogs;
