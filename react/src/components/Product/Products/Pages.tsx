import React, { useEffect, useState } from "react";
interface Props {
  numOfPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
const Pages = ({ numOfPages, setPage }: Props) => {
  const [pageArr, setpageArr] = useState([] as number[]);

  useEffect(() => {
    for (let i = 1; i <= numOfPages; i++) {
      setpageArr((pageArr) => [...pageArr, i]);
    }
  }, [numOfPages]);
  console.log({ pageArr, numOfPages });
  return (
    <div className="pages-par center">
      {pageArr?.map((num, index) => {
        {
          return (
            <div
              className="page center"
              onClick={() => setPage(index + 1)}
              key={index}
            >
              {" "}
              {num}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Pages;
