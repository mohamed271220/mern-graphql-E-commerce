import React, { useState } from "react";

const useHide = () => {
  const [show, setShow] = useState(true);

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  return [show, handleShow, handleHide] as const;
};

export default useHide;
