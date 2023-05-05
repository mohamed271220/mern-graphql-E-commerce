import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import Title from "../../widgets/Title";
import { opacityVariant } from "../../../variants/globals";
interface Props {
  numOfPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}
const Pages = ({ numOfPages, setPage, page }: Props) => {
  const [pageArr, setpageArr] = useState([] as number[]);

  useEffect(() => {
    setpageArr([]);
    for (let i = 1; i <= numOfPages; i++) {
      setpageArr((pageArr) => [...pageArr, i]);
    }
  }, [numOfPages]);
  return (
    <div className="pages-par center">
      {/* <AnimatePresence>
        {page > 1 && ( */}
      <Title title="prev page">
        <motion.button
          className="page center"
          variants={opacityVariant}
          style={{
            background: page > 1 ? "var(--wheat)" : "var(--wheat-lighter)",
          }}
          disabled={page < 2 ? true : false}
          initial="start"
          animate="end"
          exit="exit"
          transition={{ duration: 0.4 }}
          key={"prev-page"}
          onClick={() => setPage(page - 1)}
        >
          <BiLeftArrowAlt />
        </motion.button>
      </Title>
      {/* )}
      </AnimatePresence> */}
      <div className="center-pages-par">
        {pageArr?.map((num, index) => {
          {
            return (
              <>
                <div
                  className={`page center ${
                    page === index + 1 ? "page-active" : ""
                  }`}
                  onClick={() => setPage(index + 1)}
                  key={index}
                >
                  {" "}
                  {num}
                </div>
              </>
            );
          }
        })}
      </div>

      <Title title="next page">
        <motion.button
          className="page center"
          variants={opacityVariant}
          initial="start"
          animate="end"
          exit="exit"
          transition={{ duration: 0.4 }}
          key={"next-page"}
          onClick={() => setPage(page + 1)}
          style={{
            background:
              page < numOfPages ? "var(--wheat)" : "var(--wheat-lighter)",
          }}
          disabled={page > numOfPages - 1 ? true : false}
        >
          <BiRightArrowAlt />
        </motion.button>
      </Title>
    </div>
  );
};

export default Pages;
