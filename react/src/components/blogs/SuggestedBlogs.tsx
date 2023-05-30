import React, { useEffect } from "react";
import { useAppSelector } from "../../custom/reduxTypes";
import SuggestedBlog from "./SuggestedBlog";
import { stagger, useAnimate, useInView } from "framer-motion";

const SuggestedBlogs = ({ id }: { id: string }) => {
  const { blogs } = useAppSelector((st) => st.blogs);

  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { once: true });
  useEffect(() => {
    if (inView) {
      animate(
        " .suggested-blog",
        { opacity: [0, 0.5, 1], x: [200, 0] },
        { delay: stagger(1, { startDelay: 2 }), duration: 0.5 }
      );
    }
  }, [inView]);
  return (
    <div className="suggested-blogs" ref={scope}>
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
