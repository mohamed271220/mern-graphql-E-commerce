import { useMutation } from "@apollo/client";
import React from "react";
import { FILTER_BY_STATE } from "../graphql/mutations/product";

const useFilterState = () => {
  const [fn] = useMutation(FILTER_BY_STATE);

  return fn;
};

export default useFilterState;
