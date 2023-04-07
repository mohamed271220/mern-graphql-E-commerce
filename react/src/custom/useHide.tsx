import { useState } from "react";

const useHide = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);
  const handleToggle = () => setShow(!show);

  return [show, handleShow, handleHide, handleToggle] as const;
};

export default useHide;
