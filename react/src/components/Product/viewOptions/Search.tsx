import { useMutation } from "@apollo/client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Search_Mutaion } from "../../../graphql/mutations/product";
import { useNavigate } from "react-router-dom";
import { productListContext } from "../../../context/FilterData";
//@ts-ignore
import useKeypress from "react-use-keypress";
import useIndex from "../../../custom/useIndex";
import { motion } from "framer-motion";
import useClickOutside from "../../../custom/useClickOutside";
import { useAppSelector } from "../../../custom/reduxTypes";

const Search = () => {
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const [isActive, setIsActive] = useState(-1);
  const inpRef = useRef<HTMLInputElement>(null);
  const handleInputValue = (val: string) => {
    if (inpRef?.current) {
      inpRef.current.value = val;
    }
  };
  const [showRes, setShowRes] = useState(false);
  const formRef = useClickOutside<HTMLFormElement>(() => {
    setShowRes(false);
    handleInputValue("");
    setProducts(Allproducts);
    setIsActive(-1);
  }, showRes);
  const {
    setProducts,
    startTransition,
    productSearchWord,
    setroductSearchWord,
    products,
  } = useContext(productListContext);

  const [fnSearch, { data }] = useMutation(Search_Mutaion);

  useEffect(() => {
    setroductSearchWord("");
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setroductSearchWord(e.target.value);
    setShowRes(true);
    setIsActive(-1);

    if (e.target.value != "") {
      fnSearch({
        variables: {
          word: e.target.value,
        },
      }).then(({ data }) =>
        startTransition(() => setProducts(data.searchProducts))
      );
    }
  };

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isActive >= 0) {
      navigate(`/${products[isActive]._id}`);
    } else {
      fnSearch({
        variables: {
          word: productSearchWord,
        },
      }).then(({ data }) =>
        startTransition(() => {
          setProducts(data.searchProducts);
        })
      );
      if (inpRef?.current) {
        inpRef.current.value = "";
      }
    }
  };

  const [convertNegativeToZero] = useIndex();
  useKeypress(["ArrowUp", "ArrowDown", "Escape"], (e: React.KeyboardEvent) => {
    const len =
      data?.searchProducts.length >= 5 ? 5 : data?.searchProducts.length;
    if (e.key === "ArrowDown") {
      setIsActive((cur) => convertNegativeToZero(cur + 1, len));
    } else if (e.key === "Escape") {
      setIsActive(-1);

      handleInputValue(productSearchWord);
    } else {
      setIsActive((cur) => convertNegativeToZero(cur - 1, len));
    }
  });
  useEffect(() => {
    if (isActive !== -1) {
      const title = data.searchProducts[isActive].title;
      handleInputValue(title);
    }
  }, [isActive]);
  return (
    <form className="center search" onSubmit={handleSubmit} ref={formRef}>
      <input
        ref={inpRef}
        placeholder="Search By Title"
        type="text"
        onChange={handleInputChange}
      />
      <AiOutlineSearch className="search-icon" />

      {productSearchWord !== "" && (
        <>
          {showRes && (
            <ul className="dropdown-search col center start">
              {data?.searchProducts.length >= 1 ? (
                <>
                  {data?.searchProducts
                    .slice(0, 5)
                    .map(
                      (
                        {
                          _id,
                          title,
                        }: { _id: string; title: string; category: string },
                        i: number
                      ) => {
                        return (
                          <>
                            <motion.li
                              onHoverStart={() => {
                                setIsActive(i);
                              }}
                              className={`search-res  center between ${
                                i === isActive ? "active" : ""
                              }`}
                              key={_id}
                              onClick={() => {
                                handleInputValue(title);

                                navigate(`/${_id}`);
                              }}
                            >
                              {title}
                            </motion.li>
                            <div
                              className="hr "
                              style={{
                                height: 0.5,
                                background: "var(--main)",
                                margin: "0 auto",
                                display:
                                  i === data?.searchProducts.length - 1 ||
                                  i === 4
                                    ? "none"
                                    : "block",
                              }}
                            >
                              {" "}
                            </div>
                          </>
                        );
                      }
                    )}
                </>
              ) : (
                <li className="search-res center">No Results</li>
              )}
            </ul>
          )}
        </>
      )}
    </form>
  );
};

export default Search;
