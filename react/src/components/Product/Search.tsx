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

  const navigate = useNavigate();

  return (
    <form className="center search">
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
                      <li
                        className="search-res hover"
                        key={_id}
                        onClick={() => navigate(`/${_id}`)}
                        onMouseOver={() => {
                          if (inpRef?.current) {
                            inpRef.current.value = title;
                          }
                          setInp(title);
                        }}
                      >
                        {title}
                      </li>
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
