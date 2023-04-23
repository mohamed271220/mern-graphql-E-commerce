import { useState } from "react";

const useShowTitle = () => {
  const [showTitle, setShowTitle] = useState(false);

  const handleShow = () => setShowTitle(true);
  const handleHide = () => setShowTitle(false);
  return [showTitle, handleShow, handleHide] as const;
};

export default useShowTitle;
