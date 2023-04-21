import React, { createContext, useState } from "react";

interface viewConntext {
  setGridView: React.Dispatch<React.SetStateAction<boolean>>;
  gridView: boolean;
}

export const viewContext = createContext({} as viewConntext);

interface Props {
  children: React.ReactNode;
}
const GridViewContext = ({ children }: Props) => {
  const [gridView, setGridView] = useState(true);

  return (
    <viewContext.Provider value={{ gridView, setGridView }}>
      {children}
    </viewContext.Provider>
  );
};

export default GridViewContext;
