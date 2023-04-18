import React, { useContext, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { viewFilterContext } from "./Products";
import {
  FILTER_BY_PRICE,
  FILTER_BY_Rate,
  FILTER_BY_STATE,
} from "../../../graphql/mutations/product";
import { Get_All_Products } from "../../../graphql/general";

const optionsArr = [
  "relevance",
  "highest price",
  "lowest price",
  "highest rate",
  "lowest rate",
  "bestsellers",
];

const SelectFilter = () => {
  const { setProducts } = useContext(viewFilterContext);
  const [selectValue, setSelectValue] = useState("relevance");
  const [fnRevlence] = useLazyQuery(Get_All_Products);
  const [fnTrendy] = useMutation(FILTER_BY_STATE);
  const [fnPrice] = useMutation(FILTER_BY_PRICE);
  const [fnRate] = useMutation(FILTER_BY_Rate);

  useEffect(() => {
    if (selectValue === "relevance") {
      fnRevlence().then(({ data }) => setProducts(data.products));
    } else if (selectValue === "bestsellers") {
      fnTrendy({
        variables: {
          state: "trending",
        },
      }).then(({ data }) => setProducts(data.filterByState));
    } else if (selectValue === "lowest price") {
      fnPrice({
        variables: {
          price: 1,
        },
      }).then(({ data }) => setProducts(data.filterByPrice));
    } else if (selectValue === "highest price") {
      fnPrice({
        variables: {
          price: -1,
        },
      }).then(({ data }) => setProducts(data.filterByPrice));
    } else if (selectValue === "lowest rate") {
      fnRate({
        variables: {
          rate: 1,
        },
      }).then(({ data }) => setProducts(data.filterByRate));
    } else if (selectValue === "highest rate") {
      fnRate({
        variables: {
          rate: -1,
        },
      }).then(({ data }) => setProducts(data.filterByRate));
    }
  }, [selectValue]);
  return (
    <select
      name=""
      id=""
      onChange={(e) => setSelectValue(e.target.value)}
      defaultValue={"relevance"}
    >
      {optionsArr.map((opt, i) => {
        return (
          <option value={opt} key={i}>
            {opt}
          </option>
        );
      })}
    </select>
  );
};

export default SelectFilter;
