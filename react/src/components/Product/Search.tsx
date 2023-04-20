import { useMutation } from "@apollo/client";
import React, { useContext, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Search_Mutaion } from "../../graphql/mutations/product";
import { viewFilterContext } from "./Products/Products";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { setProducts, setroductSearchWord, productSearchWord } =
    useContext(viewFilterContext);

  const inpRef = useRef<HTMLInputElement>(null);
  const [inp, setInp] = useState("");
  const [fnSearch, { data }] = useMutation(Search_Mutaion);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setroductSearchWord(e.target.value);
    fnSearch({
      variables: {
        word: e.target.value,
      },
    }).then(({ data }) => setProducts(data.searchProducts));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fnSearch({
      variables: {
        word: productSearchWord,
      },
    }).then(({ data }) => setProducts(data.searchProducts));
    if (inpRef?.current) {
      inpRef.current.value = "";
    }
  };
  const navigate = useNavigate();

  return (
    <form className="center search" onSubmit={handleSubmit}>
      <input
        ref={inpRef}
        placeholder="Search By Category Or Title"
        type="text"
        onChange={handleInputChange}
      />
      <AiOutlineSearch className="search-icon" />

      {productSearchWord !== "" && (
        <ul className="dropdown-search col center start">
          {data?.searchProducts.length >= 1 ? (
            <>
              <li
                className="search-res hover  center between"
                onClick={() => {
                  if (inpRef?.current) {
                    inpRef.current.value = productSearchWord;
                  }
                }}
              >
                {productSearchWord}
              </li>
              <div
                className="hr "
                style={{
                  height: 0.5,
                  background: "var(--white)",
                  margin: "0 auto",
                }}
              >
                {" "}
              </div>
              {data?.searchProducts
                .slice(0, 5)
                .map(
                  (
                    {
                      _id,
                      title,
                      category,
                    }: { _id: string; title: string; category: string },
                    i: number
                  ) => {
                    return (
                      <>
                        <li
                          className="search-res hover center between"
                          key={_id}
                        >
                          <span
                            onClick={() => {
                              if (inpRef?.current) {
                                inpRef.current.value = title;
                              }
                            }}
                          >
                            {title}
                          </span>
                          <button
                            className=" btn list-btn"
                            style={{ scale: 0.8 }}
                            onClick={() => navigate(`/${_id}`)}
                          >
                            go
                          </button>
                        </li>
                        <div
                          className="hr "
                          style={{
                            height: 0.5,
                            background: "var(--white)",
                            margin: "0 auto",
                            display:
                              i === data?.searchProducts.length - 1 || i === 4
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
            <li className="search-res ">no results</li>
          )}
        </ul>
      )}
    </form>
  );
};

export default Search;
