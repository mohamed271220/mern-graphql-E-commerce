import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const useIsMobile = () => {
  // const [isMobile, setIsMobile] = useState(false);

  // function handleResize() {
  //   if (window.innerWidth < width) {
  //     setIsMobile(true);
  //   } else {
  //     setIsMobile(false);
  //   }
  // }
  // useEffect(() => {
  //   handleResize();
  //   window.addEventListener("resize", handleResize);

  //   return () => window.removeEventListener("resize", handleResize);
  // });

  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });

  return { isMobile };
};

export default useIsMobile;
