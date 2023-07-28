import React, { createContext, useState } from "react";
import { ChildrenInterFace } from "../interfaces/general.js";
import useIsMobile from "../custom/useIsMobile.js";

interface viewConntext {
  setGridView: React.Dispatch<React.SetStateAction<boolean>>;
  gridView: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  showSearch: boolean;
}

export const viewContext = createContext({} as viewConntext);
const GridViewContext = ({ children }: ChildrenInterFace) => {
  const { isMobile } = useIsMobile();
  const [gridView, setGridView] = useState(true);
  const [showSearch, setShowSearch] = useState(isMobile ? false : true);

  return (
    <viewContext.Provider
      value={{
        gridView,
        setGridView,
        showSearch,
        setShowSearch,
      }}
    >
      {children}
    </viewContext.Provider>
  );
};

export default GridViewContext;
