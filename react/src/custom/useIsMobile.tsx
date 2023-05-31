import React, { useEffect, useState } from "react";

const useIsMobile = (width = 600) => {
  const [isMobile, setIsMobile] = useState(false);

  function handleResize() {
    if (window.innerWidth < width) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile };
};

export default useIsMobile;
