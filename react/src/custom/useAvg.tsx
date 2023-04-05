import { useState, useEffect } from "react";

const useAvg = (rating: number[]) => {
  const [avgRate, setAvgRate] = useState(-1);

  const getAvg = (arr: number[]) => {
    let result = 0;
    const len = arr.length;

    for (const num of arr) {
      result += num;
    }

    return result / len;
  };

  useEffect(() => {
    setAvgRate(getAvg(rating));
  }, []);

  return avgRate;
};

export default useAvg;
