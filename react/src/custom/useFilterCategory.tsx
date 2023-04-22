import { useMutation } from "@apollo/client";
import React from "react";
import { FILTER_BY_Catagroy } from "../graphql/mutations/product";

const useFilterCategory = () => {
  const [fn] = useMutation(FILTER_BY_Catagroy);

  return fn;
};

export default useFilterCategory;
