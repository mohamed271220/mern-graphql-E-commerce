import { useState, useEffect } from "react";

const usePagination = (num: number, page: number, arr: any[], fn?: any) => {
  const [dataShown, setDataShown] = useState([] as any);
  const [numOfPages, setNumOfPage] = useState(0);
  const numberOfProducts = num;
  const firstProduct = page * numberOfProducts - num;
  const lastProduct = page * numberOfProducts;
  useEffect(() => {
    if (arr?.length >= 0) {
      if (fn) {
        fn(() => {
          setDataShown(arr?.slice(firstProduct, lastProduct));
        });
      } else {
        setDataShown(arr?.slice(firstProduct, lastProduct));
      }

      setNumOfPage(Math.ceil(arr?.length / num));
    }
  }, [page, arr]);

  return [dataShown, numOfPages];
};

export default usePagination;
